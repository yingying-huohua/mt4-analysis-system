import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {HeaderMenu} from '../constant/HeaderMenu';
import {HttpService} from '../service/http/http.service';
import {Config} from '../config/Config';
import {LocalstorageKey} from '../constant/LocalstorageKey';
import {FuturesService} from '../service/http/futures.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public isLogin = false;
  public currentSymbol = 'AUDCHF';
  constructor(private httpService: HttpService,
              private futuresService: FuturesService) { }

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
   * 日期格式化 （年-月-日 时分秒）
   * @param date 时间
   */
  dateTimeFormat(date: string) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }

  /**
   * 检查当前看板是否为综合看板
   */
  isIntegrativeDashboard(standardSymbol) {
    let isIntegrative;
    switch (standardSymbol) {
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

  saveFutureProductToStorage() {
    console.debug('保存期货中品种列表至storage');
    const observer = {
      next: response => {
        if (!response || !response.result) {
          return;
        }
        console.debug(response)
        const symbolList = response.result;
        localStorage.setItem(LocalstorageKey.future_product_list, JSON.stringify(symbolList));
      }
    };
    this.futuresService.symbolList().subscribe(observer);
  }

  saveUserListToStorage() {
    console.debug('保存期货中用户列表至storage');
    const observer = {
      next: response => {
        if (!response || !response.result) {
          return;
        }
        console.debug(response)
        const symbolList = response.result;
        localStorage.setItem(LocalstorageKey.future_user_list, JSON.stringify(symbolList));
      }
    };
    this.futuresService.userList().subscribe(observer);
  }

  getSymbolListFromStorage(type?) {
    const listStr = localStorage.getItem(LocalstorageKey.symbol_list);
    // 数据不存在时
    if (!listStr) {
      return [];
    }
    const list = JSON.parse(listStr);
    // 类型不存在时
    if (!type) {
      return list;
    }

    // 遍历列表，获取当前类型下所有品种
    const symbolList = [];
    for (const item of list) {
      if (item.type === type) {
        symbolList.push(item);
      }
    }
    return symbolList;
  }
}
