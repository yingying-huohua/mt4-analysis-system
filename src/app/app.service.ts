import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  moneyFormat(value: string) {
    return Number.parseFloat(value).toFixed(2);
  }

  rateFormat(value: number) {
    value = value * 100;
    return Number.parseFloat(value.toString()).toFixed(2) + '%';
  }

  /**
   * 日期格式化 （年-月-日）
   * @param date
   */
  dateFormat(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }
}
