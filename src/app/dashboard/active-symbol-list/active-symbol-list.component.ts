import {AfterContentInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-active-symbol-list',
  templateUrl: './active-symbol-list.component.html',
  styleUrls: ['./active-symbol-list.component.css']
})
export class ActiveSymbolListComponent implements OnInit, AfterContentInit {
  @Input() category;
  option;
  dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
  data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
  myChart;
  constructor() { }

  ngOnInit(): void {
    this.initOption();
  }

  ngAfterContentInit() {

  }

  initOption() {

    const yMax = 500;
    const dataShadow = [];
    for (var i = 0; i < this.data.length; i++) {
      dataShadow.push(yMax);
    }

    this.option = {
      xAxis: {
        data: this.dataAxis,
        axisLabel: {
          inside: true,
          textStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#999'
          }
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        { // For shadow
          type: 'bar',
          itemStyle: {
            color: 'rgba(0,0,0,0.05)'
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false
        },
        {
          type: 'bar',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#83bff6'},
                {offset: 0.5, color: '#188df0'},
                {offset: 1, color: '#188df0'}
              ]
            )
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#2378f7'},
                  {offset: 0.7, color: '#2378f7'},
                  {offset: 1, color: '#83bff6'}
                ]
              )
            }
          },
          data: this.data
        }
      ]
    };
  }

  initedChart(echarts: echarts) {
    this.myChart = echarts;
  }

  initEvent(params) {
    console.debug(params);
    // Enable data zoom when user click bar.
    const zoomSize = 6;
    // this.myChart.on('click', function (params) {
    //
    // });
    console.log(this.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    this.myChart.dispatchAction({
      type: 'dataZoom',
      startValue: this.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue: this.dataAxis[Math.min(params.dataIndex + zoomSize / 2, this.data.length - 1)]
    });
  }
}
