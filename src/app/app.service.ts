import { Injectable } from '@angular/core';
import * as moment from "moment";
import {HeaderMenu} from "../constant/HeaderMenu";
import {HttpService} from "../service/http/http.service";
import {Config} from "../config/Config";
import {LocalstorageKey} from "../constant/LocalstorageKey";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public isLogin = false;
  constructor(private httpService: HttpService) { }

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

  /**
   * 检查当前看板是否为综合看板
   */
  isIntegrativeDashboard(symbol) {
    let isIntegrative;
    switch (symbol) {
      case HeaderMenu.futures:
      case HeaderMenu.foreign_exchange:
        isIntegrative = true;
        break;
      default:
        isIntegrative = false;
        break;
    }
    return isIntegrative;
  }

  saveSymbolListToStorage() {
    console.debug('保存品种列表至storage');
    const observer = {
      next: response => {
        if (!response || !response.result) {
          return;
        }
        const symbolList = response.result;
        localStorage.setItem(LocalstorageKey.symbol_list, JSON.stringify(symbolList));
      }
    };
    this.httpService.symbolList(Config.defaultPageNo.toString(), Config.pageSize_1000.toString()).subscribe(observer);
  }
}
