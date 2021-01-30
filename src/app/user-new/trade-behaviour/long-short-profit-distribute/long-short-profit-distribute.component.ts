import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FuturesService} from "../../../../service/http/futures.service";
import {BaseComponent} from "../../../BaseComponent";
import {AppService} from "../../../app.service";

@Component({
  selector: 'app-long-short-profit-distribute',
  templateUrl: './long-short-profit-distribute.component.html',
  styleUrls: ['./long-short-profit-distribute.component.css']
})
export class LongShortProfitDistributeComponent implements OnInit, OnChanges {
  @Input() userSelectValue = [];
  @Input() openStart = '';
  @Input() openEnd = '';
  option;
  noResult = false;
  constructor(private futureService: FuturesService,
              private appService: AppService) {}

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (!changes.hasOwnProperty(key)) {
        continue;
      }

      if (changes[key].firstChange) {
        continue;
      }

      this.getData();
    }
  }

  /**
   * 服务端接口获取数据
   */
  getData() {
    const observer = {
      next: response => {
        if (!response || response.length === 0) {
          this.noResult = true;
          return;
        }
        this.setOption(response);
      }
    }
    const object = {
      accountIds: this.userSelectValue.length ? this.userSelectValue.join(',') : '',
      openStart: this.openStart,
      openEnd: this.openEnd,
    }
    this.futureService.bbp(object).subscribe(observer);
  }

  setOption(sourceData) {
    this.noResult = false;
    sourceData = this.formatData(sourceData);
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['收益']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value'
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: {
            show: false
          },
          data: sourceData.data
        }
      ],
      series: [
        {
          name: '收益',
          type: 'bar',
          label: {
            show: true,
            position: 'inside'
          },
          emphasis: {
            focus: 'series'
          },
          data: sourceData.source
        },
      ]
    };

  }


  formatData(dataList) {
    const newdataList = [];
    const sourceList = [];
    for (const data of dataList) {
      const object = {
        name: data.direction,
        value: this.appService.moneyFormat(data.totalProfit.toString())
      }
      sourceList.push(object);
      newdataList.push(data.direction);
    }

    return {
      data: newdataList,
      source: sourceList
    }
  }
}
