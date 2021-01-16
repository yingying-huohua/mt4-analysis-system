import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-symbol-long-short-distribution',
  templateUrl: './symbol-long-short-distribution.component.html',
  styleUrls: ['./symbol-long-short-distribution.component.css']
})
export class SymbolLongShortDistributionComponent implements OnInit {

  option;
  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    // var weatherIcons = {
    //   'Sunny': ROOT_PATH + '/data/asset/img/weather/sunny_128.png',
    //   'Cloudy': ROOT_PATH + '/data/asset/img/weather/cloudy_128.png',
    //   'Showers': ROOT_PATH + '/data/asset/img/weather/showers_128.png'
    // };

    this.option = {
      // title: {
      //   text: '天气情况统计',
      //   subtext: '虚构数据',
      //   left: 'center'
      // },
      // tooltip: {
      //   trigger: 'item',
      //   formatter: '{a} <br/>{b} : {c} ({d}%)'
      // },
      legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: 'center',
        data: ['西凉', '益州', '兖州', '荆州', '幽州']
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [
            { value: 1548,name: '幽州'},
            {value: 535, name: '荆州'},
            {value: 510, name: '兖州'},
            {value: 634, name: '益州'},
            {value: 735, name: '西凉'}
          ],
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
}
