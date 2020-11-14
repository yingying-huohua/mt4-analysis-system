import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-profit-distributed',
  templateUrl: './profit-distributed.component.html',
  styleUrls: ['./profit-distributed.component.css']
})
export class ProfitDistributedComponent implements OnInit, OnChanges {
  @Input()
  lossRate;
  @Input()
  breakEvenRate;
  @Input()
  profitRate;


  @Input()
  profitUserCount;
  @Input()
  lossUserCount;
  @Input()
  breakEvenUserCount;

  dataList = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (!changes.hasOwnProperty(key)) {
        continue;
      }

      if (changes[key].firstChange) {
        continue;
      }

      this.initData();
    }
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.dataList = [
      {
        lable: this.lossUserCount + '人 亏损',
        value: this.formatPercent(this.lossRate),
        strokeStyle: '#87d068'
      },
      {
        lable: this.profitUserCount + '人 盈利',
        value: this.formatPercent(this.profitRate),
        strokeStyle: '#ff4d4f'
      },
      {
        lable: this.breakEvenUserCount + '人 持平',
        value: this.formatPercent(this.breakEvenRate),
        strokeStyle: '#108ee9'
      }
    ];
  }

  formatPercent(value) {
    if (!value) {
      value = 0;
    }
    return (value* 100).toFixed(2);
  }
}
