import { Component, OnInit } from '@angular/core';
import {Config} from "../../../config/Config";
import {HttpService} from "../../../service/http/http.service";

@Component({
  selector: 'app-user-profit-list',
  templateUrl: './user-profit-list.component.html',
  styleUrls: ['./user-profit-list.component.css']
})
export class UserProfitListComponent implements OnInit {
  option;
  dataList = [];
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getData();
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
    this.httpService.symoblDashboardUserProfitList(Config.defaultPageNo.toString(),
      Config.symbolDashboardPageSize.toString()).subscribe(observer);
  }

  /**
   * 格式化数据
   * @param data
   */
  private formatSourceData(data) {
    const axis =  ['profit', 'accountId'];
    this.dataList.push(axis);
    for (const dataItem of data) {
      const dataItemArray = [];
      dataItemArray.push(dataItem.profit);
      dataItemArray.push(dataItem.accountId);
      this.dataList.push(dataItemArray);
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
        min: 0,
        max: 1000,
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
            x: '利润',
            // Map the "product" column to Y axis
            y: 'accountId'
          }
        }
      ]
    };
  }
}
