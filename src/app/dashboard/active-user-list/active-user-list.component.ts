import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpService} from '../../../service/http/http.service';
import {Config} from '../../../config/Config';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-active-user-list',
  templateUrl: './active-user-list.component.html',
  styleUrls: ['./active-user-list.component.css']
})
export class ActiveUserListComponent implements OnInit, OnChanges {
  @Input() symbol;
  option;
  dataList = [];
  minValue = 0;
  maxValue = 0;
  constructor(private httpService: HttpService ) { }
  constructor(private httpService: HttpService,
              private appService: AppService) { }


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
        this.formatSourceData(response.result);
        this.setOption();
      }
    }

    // 品种看板时
    if (!this.appService.isIntegrativeDashboard(this.symbol)) {
      this.httpService.symoblDashboardActiveUserList(this.symbol, Config.defaultPageNo.toString(),
        Config.symbolDashboardPageSize.toString()).subscribe(observer);
      return;
    }

    // TODO 综合看板时

  }

  /**
   * 格式化数据
   */
  private formatSourceData(data) {
    for (const dataItem of data) {
      const dataItemArray = [];
      dataItemArray.push(dataItem.totalCount);
      dataItemArray.push(dataItem.accountId);
      this.dataList.push(dataItemArray);

      //计算最大值和最小值
      const account = Number.parseFloat(dataItem.totalCount);
      this.calcMaxMinValue(account);
    }
    this.dataList.reverse();

    //添加标记行
    const axis =  ['totalCount', 'accountId'];
    this.dataList.splice(0, 0, axis);
  }

  private calcMaxMinValue(value) {
    if(value > this.maxValue) {
      this.maxValue = value;
    }
    if(value < this.minValue) {
      this.minValue = value;
    }
  }

  /**
   * 设置option
   */
  private setOption() {
    this.option = {
      dataset: {
        source: this.dataList
      },
      textStyle: {
        fontSize: '10px',
        color: '#B1B0B0'
      },
      grid: {containLabel: true},
      xAxis: {name: '交易笔数'},
      yAxis: {name: '用户账号', type: 'category'},
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: this.minValue,
        max: this.maxValue,
        text: ['高', '低'],
        textStyle: {
          fontSize: '10px',
          color: '#B1B0B0'
        },
        // Map the score column to color
        dimension: 0,
        inRange: {
          color: ['#D7DA8B', '#E15457']
        }
      },
      series: [
        {
          type: 'bar',
          encode: {
            // Map the "amount" column to X axis.
            x: 'totalCount',
            // Map the "product" column to Y axis
            y: 'accountId'
          }
        }
      ]
    };
  }

}
