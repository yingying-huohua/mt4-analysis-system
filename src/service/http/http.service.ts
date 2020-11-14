import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlConfig} from "../../config/UrlConfig";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
   * 用户列表（联想）
   */
  userList(accountId: string, pageNo: string, pageSize: string) {
    const params = {
      accountId: accountId,
      pageNo: pageNo,
      pageSize: pageSize
    }
    return this.http.get(UrlConfig.userList, {params: params});
  }

  /**
   * 登录
   */
  login(username: string, password: string) {
   const params = {
     username: username,
     password: password
   }
    return this.http.post(UrlConfig.login, null, {params: params});
  }

  /**
   * 品种列表
   */
  symbolList(pageNo: string, pageSize: string) {
    const params = {
      pageNo: pageNo,
      pageSize: pageSize
    }
    return this.http.get(UrlConfig.symbolList, {params: params});
  }

  /**
   * 品种详情
   */
  symbolDetail(id: string) {
    return this.http.get(UrlConfig.symbolDetail.replace('{{id}}', id));
  }

  /**
   * 品种增加
   */
  symbolAdd(object) {
    const headers = {'content-type': 'application/json'};
    return this.http.post(UrlConfig.symbol, JSON.stringify(object), {headers: headers});
  }

  /**
   * 品种修改
   */
  symbolUpdate(object) {
    const headers = {'content-type': 'application/json'};
    return this.http.put(UrlConfig.symbol, JSON.stringify(object),  {headers: headers});
  }

  /**
   * 用户收益列表
   */
  userProfitlist(params: {accountId: string, symbol: string, minReturn: string, maxReturn: string,
    sortField: string, direction: string, openStart: string, openEnd: string, pageNo: string, pageSize: string}) {

    return this.http.get(UrlConfig.userProfitList, {params: params});
  }

  /**
   * 用户收益详细
   */
  userProfitDetail(params: {accountId: string, symbol: string, sortField: string, direction: string,
    openStart: string, openEnd: string, pageNo: string, pageSize: string}) {
    return this.http.get(UrlConfig.userProfitDetail, {params: params});
  }


  /**
   * 用户组收益列表
   */
 groupProfitList(params: {groupName: string, openStart: string, openEnd: string,
    sortField: string, direction: string, pageNo: string, pageSize: string}) {
    return this.http.get(UrlConfig.groupProfitList, {params: params});
  }

  /**
   * 用户组收益列表
   */
  groupMemberList(params: {groupId: string, pageNo: string, pageSize: string}) {
    return this.http.get(UrlConfig.groupUserList, {params: params});
  }


  /**
   * 品种收益列表
   */
  symbolProfitList(params: {type: string, symbol: string, openStart: string, openEnd: string,
    sortField: string, direction: string, pageNo: string, pageSize: string}) {
    return this.http.get(UrlConfig.symbolProfitList, {params: params});
  }

  /**
   * 品种收益列表
   */
  symbolProfitUserList(params: {returnType: string, symbol: string, openStart: string, openEnd: string,
    sortField: string, direction: string, pageNo: string, pageSize: string}) {
    return this.http.get(UrlConfig.symbolProfitUserList, {params: params});
  }


  /**
   * 品种看板meta信息
   */
  symoblDashboardMeta(symbol: string) {
    return this.http.get(UrlConfig.symoblDashboardMeta, {params: {symbol: symbol}});
  }

  /**
   * 品种看板用户收益列表
   */
  symoblDashboardUserProfitList(symbol: string, pageNo: string, pageSize: string) {
    const params = {
      symbol: symbol,
      pageNo: pageNo,
      pageSize: pageSize
    }
    return this.http.get(UrlConfig.symoblDashboardUserProfitList, {params: params});
  }

  /**
   * 品种看板活跃用户列表
   */
  symoblDashboardActiveUserList(symbol: string, pageNo: string, pageSize: string) {
    const params = {
      symbol: symbol,
      pageNo: pageNo,
      pageSize: pageSize
    }
    return this.http.get(UrlConfig.symoblDashboardActiveUserList, {params: params});
  }
  /**
   * 品种看板用户交易额列表
   */
  symbolDashboardUserAmountList(symbol: string, pageNo: string, pageSize: string) {
    const params = {
      symbol: symbol,
      pageNo: pageNo,
      pageSize: pageSize
    }
    return this.http.get(UrlConfig.symbolDashboardUserAmountList, {params: params});
  }

}
