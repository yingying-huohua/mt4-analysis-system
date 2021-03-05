import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FuturesUrlConfig} from "../../config/FuturesUrlConfig";

@Injectable({
  providedIn: 'root'
})
export class FuturesService {

  constructor(private http: HttpClient) {}

  /**
   * 用户列表
   */
  userList() {
    return this.http.get(FuturesUrlConfig.userList);
  }

  /**
   * 用户收益列表（排行）
   */
  userProfitList(params: {accountIds: string, productId: string, sortField: string,
          direction: string, openStart: string, openEnd: string, pageNo: string, pageSize: string}) {
    return this.http.get(FuturesUrlConfig.userProfitList, {params: params});
  }

  /**
   * 品种列表
   */
  symbolList() {
    return this.http.get(FuturesUrlConfig.symbolList);
  }

  /**
   * 品种收益列表
   */
  symbolProfitList(params:{productId: string, sortField: string, direction: string,
    openStart: string, openEnd: string, pageNo: string, pageSize: string}) {
    return this.http.get(FuturesUrlConfig.symbolProfitList, {params: params});
  }

  /**
   * 持仓列表
   */
  positionList(params: {accountIds: string, sortField: string, direction: string,
    openStart: string, openEnd: string, pageNo: string, pageSize: string}) {
    return this.http.get(FuturesUrlConfig.positionList, {params: params});
  }

  /**
   * 资金列表
   */
  accountList(params: {accountIds: string, sortField: string, direction: string,
    openStart: string, openEnd: string, pageNo: string, pageSize: string}) {
    return this.http.get(FuturesUrlConfig.accountList, {params: params});
  }

  /**
   * 品种多空分布
   */
  bbd(params: {accountIds: string, openStart: string, openEnd: string}) {
    return this.http.get(FuturesUrlConfig.bbd, {params: params});
  }

  /**
   * 多空盈亏分布
   */
  bbp(params: {accountIds: string, openStart: string, openEnd: string}) {
    return this.http.get(FuturesUrlConfig.bbp, {params: params});
  }

  /**
   * 持仓时长分布
   * @param params
   */
  positionDistribute(params: {accountIds: string, openStart: string, openEnd: string}) {
    return this.http.get(FuturesUrlConfig.positionDistribute, {params: params});
  }
}
