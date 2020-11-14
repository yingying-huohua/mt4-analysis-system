import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as echarts from 'echarts';
import {HeaderMenu} from "../../../constant/HeaderMenu";
import {Config} from "../../../config/Config";
import {HttpService} from "../../../service/http/http.service";

@Component({
  selector: 'app-active-symbol-list',
  templateUrl: './active-symbol-list.component.html',
  styleUrls: ['./active-symbol-list.component.css']
})
export class ActiveSymbolListComponent implements OnInit, OnChanges {
  @Input() category;
  option;
  dataAxis = [];
  data = [];
  myChart;
  constructor(private httpService: HttpService) { }

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
      },
      error: () => {
        this.formatSourceData([]);
        this.setOption();
      }
    }

    // 综合看板时
    if(this.category === HeaderMenu.futures) {
      this.httpService.futuresIndexDashboardActiveSymbolList(this.category, Config.defaultPageNo.toString(),
        Config.symbolDashboardPageSize_30.toString()).subscribe(observer);
      return;
    }
    if(this.category === HeaderMenu.foreign_exchange) {
      this.httpService.forexDashboardActiveSymbolList(this.category, Config.defaultPageNo.toString(),
        Config.symbolDashboardPageSize_30.toString()).subscribe(observer);
      return;
    }

  }

  private formatSourceData(data) {
    this.dataAxis = [];
    this.data = [];
    if (!data) {
      return;
    }
    for (const dataItem of data) {
      this.dataAxis.push(dataItem.symbol);
      this.data.push(dataItem.totalCount);
    }

  }

  setOption() {
    const yMax = 500;
    const dataShadow = [];
    for (let i = 0; i < this.data.length; i++) {
      dataShadow.push(yMax);
    }

    this.option = {
      xAxis: {
        name: '品种名称',
        nameTextStyle:{
          color: '#ffffff'
        },
        data: this.dataAxis,
        textStyle: {
          fontSize: '10px',
          color: '#ffffff'
        },
        axisLabel: {
          inside: true,
          textStyle: {
            color: '#fff',
            fontSize: '10px',
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true
        },
        z: 10
      },
      yAxis: {
        name: '交易次数',
        nameTextStyle:{
          color: '#ffffff'
        },
        axisLine: {
          show: true
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            fontSize: '10px',
            color: '#ffffff'
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
    console.log(this.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    this.myChart.dispatchAction({
      type: 'dataZoom',
      startValue: this.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue: this.dataAxis[Math.min(params.dataIndex + zoomSize / 2, this.data.length - 1)]
    });
  }
}
