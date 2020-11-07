import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-symbol-trend',
  templateUrl: './symbol-trend.component.html',
  styleUrls: ['./symbol-trend.component.css']
})
export class SymbolTrendComponent implements OnInit {
  option;
  constructor() { }

  ngOnInit(): void {
    this.initData()
  }

  initData() {
    this.option = {
      textStyle: {
        fontSize: '10px',
        color: '#B1B0B0'
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        // axisPointer: {
        //   type: 'shadow'
        // },
        transitionDuration: 0
      },
      xAxis: {
        type: 'category',
        data: ['2020-08-03', '2020-08-04', '2020-08-05', '2020-08-06', '2020-08-07', '2020-08-08', '2020-08-09', '2020-08-10']
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {color: 'rgb(51,51,51)'}
        }
      },
      series: [{
        data: [12,16,17,19,25,63,79],
        type: 'line',
        lineStyle: {
          color: '#FE5702'
        }
      }]
    }
  }
}
