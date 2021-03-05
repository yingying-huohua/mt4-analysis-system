import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import * as echarts from 'echarts';
import {FuturesService} from "../../../../service/http/futures.service";
import {BaseComponent} from "../../../BaseComponent";

@Component({
  selector: 'app-holding-time-distribution',
  templateUrl: './holding-time-distribution.component.html',
  styleUrls: ['./holding-time-distribution.component.css']
})
export class HoldingTimeDistributionComponent extends BaseComponent implements OnInit {
  @Input() userSelectValue = [];
  @Input() openStart = '';
  @Input() openEnd = '';
  noResult = false;
  option;
  dataAxis = [];
  data = [];
  myChart;
  constructor(private httpService: FuturesService) {
    super();
  }

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
        console.debug('HoldingTimeDistributionComponent get data:', response);
        if (!response || response.length === 0) {
          this.noResult = true;
          return;
        }
        this.formatSourceData(response);
        this.setOption();
      },
      error: () => {
        this.formatSourceData([]);
        this.setOption();
      }
    }
    const object = {
      accountIds: this.userSelectValue.length ? this.userSelectValue.join(',') : '',
      openStart: this.openStart,
      openEnd: this.openEnd,
    }

    this.httpService.positionDistribute(object).subscribe(observer);

  }

  private formatSourceData(data) {
    this.dataAxis = [];
    this.data = [];
    if (!data) {
      return;
    }
    for (const dataItem of data) {
      this.dataAxis.push(dataItem.product_name);
      this.data.push(dataItem.ccdays);
    }

  }

  setOption() {
    this.noResult = false;
    const yMax = 500;
    const dataShadow = [];
    console.debug(this.dataAxis)
    console.debug(this.data);
    for (let i = 0; i < this.data.length; i++) {
      dataShadow.push(yMax);
    }

    this.option = {
      tooltip: {
        show: true,
        trigger: 'axis',
        transitionDuration: 0,
        formatter: `品种名称: {b1}<br /> 交易次数: {c1}`
      },
      xAxis: {
        name: '品种名称',
        nameTextStyle:{
          color: '#000000'
        },
        data: this.dataAxis,
        textStyle: {
          fontSize: '10px',
          color: '#000000'
        },
        axisLabel: {
          inside: true,
          textStyle: {
            color: '#000000',
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
          color: '#000000'
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
            color: '#000000'
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
          animation: false,
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
