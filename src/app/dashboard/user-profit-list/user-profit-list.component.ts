import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Config} from '../../../config/Config';
import {HttpService} from '../../../service/http/http.service';
import {AppService} from '../../app.service';
import {HeaderMenu} from 'src/constant/HeaderMenu';

@Component({
  selector: 'app-user-profit-list',
  templateUrl: './user-profit-list.component.html',
  styleUrls: ['./user-profit-list.component.css']
})
export class UserProfitListComponent implements OnInit, OnChanges {
  @Input() symbol;
  @Input() category;
  option;
  dataList = [];
  maxValue = 0;
  minValue = 0;

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
    this.dataList = [];

    const observer = {
      next: response => {
        if (!response) {
          return;
        }
        this.formatSourceData(response.result);
        this.setOption();
      }
    }

    // 综合看板时
    if(this.category === HeaderMenu.futures) {
      this.httpService.futuresIndexDashboardUserProfitList(this.symbol, Config.defaultPageNo.toString(),
        Config.symbolDashboardPageSize.toString()).subscribe(observer);
      return;
    }
    if(this.category === HeaderMenu.foreign_exchange) {
      this.httpService.forexDashboardUserProfitList(this.symbol, Config.defaultPageNo.toString(),
        Config.symbolDashboardPageSize.toString()).subscribe(observer);
      return;
    }

    // 品种看板时
    this.httpService.symoblDashboardUserProfitList(this.symbol, Config.defaultPageNo.toString(),
      Config.symbolDashboardPageSize.toString()).subscribe(observer);
  }

  /**
   * 格式化数据
   * @param data
   */
  private formatSourceData(data) {
    for (const dataItem of data) {
      const dataItemArray = [];
      dataItemArray.push(dataItem.profit);
      dataItemArray.push(dataItem.accountId);
      this.dataList.push(dataItemArray);

      //计算最大值和最小值
      const profitNum = Number.parseFloat(dataItem.profit);
      this.calcMaxMinValue(profitNum);
    }
    this.dataList.reverse();

    //添加标记行
    const axis = ['profit', 'accountId'];
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
      xAxis: {name: '利润'},
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
          color: ['#0E78EB', '#AA0D7E']
        }
      },
      series: [
        {
          type: 'bar',
          encode: {
            // Map the "amount" column to X axis.
            x: 'profit',
            // Map the "product" column to Y axis
            y: 'accountId'
          }
        }
      ]
    };
  }
}
