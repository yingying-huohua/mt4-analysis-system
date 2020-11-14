import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public isLogin = true;
  constructor() { }

  /**
   * 数字格式化，保留两位小数
   * @param value 金额
   */
  moneyFormat(value: string) {
    if (!value) {
      return '';
    }
    // 格式化金额 万/亿
    const valueNum = Number.parseFloat(value);
    return valueNum.toFixed(2);
  }

  /**
   * 带单位计算的数字格式化
   * 万/亿
   * @param value 金额
   */
  moneyFormatWithUnit(value) {
    if (!value) {
      return '';
    }
    // 格式化金额 万/亿
    const valueNum = Number.parseFloat(value);
    if (Math.abs(valueNum) >= 10e8) {
      return `${(valueNum / 10e8).toFixed(2)}亿`;
    }
    if (Math.abs(valueNum) >= 10e3) {
      return `${(valueNum / 10e3).toFixed(2)}万`;
    }
    return valueNum.toFixed(2);
  }

  rateFormat(value: number) {
    value = value * 100;
    return Number.parseFloat(value.toString()).toFixed(2) + '%';
  }

  /**
   * 日期格式化 （年-月-日）
   * @param date 时间
   */
  dateFormat(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }
}
