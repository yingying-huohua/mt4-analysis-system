import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FuturesService} from "../../../../service/http/futures.service";

@Component({
  selector: 'app-symbol-long-short-distribution',
  templateUrl: './symbol-long-short-distribution.component.html',
  styleUrls: ['./symbol-long-short-distribution.component.css']
})
export class SymbolLongShortDistributionComponent implements OnInit, OnChanges {
  @Input() userSelectValue = [];
  @Input() openStart = '';
  @Input() openEnd = '';
  option;
  noResult = false;
  constructor(private futureService: FuturesService) { }

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

  getData() {
    const observer = {
      next: response => {
        if (!response || response.length === 0) {
          this.noResult = true;
          return;
        }
        console.debug(response);
        this.setOption(response);
      }
    }

    const object = {
      accountIds: this.userSelectValue.length ? this.userSelectValue.join(',') : '',
      openStart: this.openStart,
      openEnd: this.openEnd,
    }

    this.futureService.bbd(object).subscribe(observer);
  }

  setOption(sourceData) {
    this.noResult = false;
    sourceData = this.formatData(sourceData);
    this.option = {
      legend: {
        bottom: 10,
        left: 'center',
        data: sourceData.data
      },
      dataset: {
        source: sourceData.source
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          // data: this.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }


  private formatData(dataList) {
    const newdataList = [];
    const sourceList = [];
    for (const data of dataList) {
      const object = {
        name: data.direction,
        value: data.count
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
