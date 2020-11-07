import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profit-distributed',
  templateUrl: './profit-distributed.component.html',
  styleUrls: ['./profit-distributed.component.css']
})
export class ProfitDistributedComponent implements OnInit {
  @Input() lossRate;
  @Input() breakEvenRate;
  @Input() profitRate;

  dataList = [];

  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.dataList = [
      {
        lable: '盈利',
        value: this.formatPercent(this.profitRate),
        strokeStyle: '#108ee9'
      },
      {
        lable: '亏损',
        value: this.formatPercent(this.lossRate),
        strokeStyle: '#ff4d4f'
      },
      {
        lable: '持平',
        value: this.formatPercent(this.profitRate),
        strokeStyle: '#87d068'
      }
    ]
  }

  formatPercent(value) {
    return value * 100;
  }
}
