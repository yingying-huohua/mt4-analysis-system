import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpService} from 'src/service/http/http.service';
import {AppService} from 'src/app/app.service';
import {Config} from 'src/config/Config';

@Component({
  selector: 'app-user-trade-amount-list',
  templateUrl: './user-trade-amount-list.component.html',
  styleUrls: ['./user-trade-amount-list.component.css']
})
export class UserTradeAmountListComponent implements OnInit, OnChanges {
  @Input() symbol;
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
    const observer = {
      next: response => {
        if (!response) {
          return;
        }
        this.formatSourceData(response.result);
        this.setOption();
      }
    }

    // 品种看板时
    // TODO 交易额接口
    this.httpService.symbolDashboardUserAmountList(this.symbol, Config.defaultPageNo.toString(),
      Config.symbolDashboardPageSize.toString()).subscribe(observer);
    return;
  }

  /**
   * 格式化数据
   * @param data
   */
  private formatSourceData(data) {
    for (const dataItem of data) {
      const dataItemArray = [];
      dataItemArray.push(dataItem.amount);
      dataItemArray.push(dataItem.accountId);
      this.dataList.push(dataItemArray);

      //计算最大值和最小值
      const amountNum = Number.parseFloat(dataItem.amount);
      this.calcMaxMinValue(amountNum);
    }
    this.dataList.reverse();

    //添加标记行
    const axis = ['amount', 'accountId'];
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
      xAxis: {name: '用户账号', type: 'category'},
      yAxis: {name: '利润'},
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
            x: 'accountId',
            // Map the "product" column to Y axis
            y: 'amount'
          }
        }
      ]
    };
  }

}