import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlConfig} from '../../config/UrlConfig';

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
  symbolList(pageNo: string, pageSize: string, type?: string) {
    const params = {
      pageNo: pageNo,
      pageSize: pageSize,
      type: type ? type : ''
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
  userProfitlist(params: {accountId: string, standardSymbol: string, minReturn: string, maxReturn: string,
    sortField: string, direction: string, openStart: string, openEnd: string, pageNo: string, pageSize: string}) {

    return this.http.get(UrlConfig.userProfitList, {params: params});
  }

  /**
   * 用户收益详细
   */
  userProfitDetail(params: {accountId: string, standardSymbol: string, sortField: string, direction: string,
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
  symbolProfitList(params: {type: string, standardSymbol: string, openStart: string, openEnd: string,
    sortField: string, direction: string, pageNo: string, pageSize: string}) {
    return this.http.get(UrlConfig.symbolProfitList, {params: params});
  }

  /**
   * 品种收益列表
   */
  symbolProfitUserList(params: {returnType: string, standardSymbol: string, openStart: string, openEnd: string,
    sortField: string, direction: string, pageNo: string, pageSize: string}) {
    return this.http.get(UrlConfig.symbolProfitUserList, {params: params});
  }

  /**
   * 品种看板meta信息
   */
  symoblDashboardMeta(standardSymbol: string) {
    return this.http.get(UrlConfig.symoblDashboardMeta, {params: {standardSymbol: standardSymbol}});
  }

  /**
   * 品种看板用户收益列表
   */
  symoblDashboardUserProfitList(standardSymbol: string, pageNo: string, pageSize: string) {
    const params = {
      standardSymbol: standardSymbol,
      pageNo: pageNo,
      pageSize: pageSize
    }
    return this.http.get(UrlConfig.symoblDashboardUserProfitList, {params: params});
  }

  /**
   * 品种看板活跃用户列表
   */
  symoblDashboardActiveUserList(standardSymbol: string, pageNo: string, pageSize: string) {
    const params = {
      standardSymbol: standardSymbol,
      pageNo: pageNo,
      pageSize: pageSize
    }
    return this.http.get(UrlConfig.symoblDashboardActiveUserList, {params: params});
  }
  /**
   * 品种看板用户交易额列表
   */
  symbolDashboardUserAmountList(standardSymbol: string, pageNo: string, pageSize: string) {
    const params = {
      standardSymbol: standardSymbol,
      pageNo: pageNo,
      pageSize: pageSize
    }
    return this.http.get(UrlConfig.symbolDashboardUserAmountList, {params: params});
  }

  /**************************期货看板*************************************/

  /**
   * 期货看板meta信息
   */
  futuresIndexDashboardMeta(standardSymbol: string) {
    return this.http.get(UrlConfig.futuresIndexDashboardMeta, {params: {standardSymbol: standardSymbol}});
  }

  /**
   * 期货看板活跃用户列表
   */
  futuresIndexDashboardActiveUserList(standardSymbol: string, pageNo: string, pageSize: string) {
    const params = {
      standardSymbol: standardSymbol,
      pageNo: pageNo,
      pageSize: pageSize
    }
    return this.http.get(UrlConfig.futuresIndexDashboardActiveUserList, {params: params});
  }

  /**
   * 期货看板用户收益列表
   */
  futuresIndexDashboardUserProfitList(standardSymbol: string, pageNo: string, pageSize: string) {
    const params = {
      standardSymbol: standardSymbol,
      pageNo: pageNo,
      pageSize: pageSize
    }
    return this.http.get(UrlConfig.futuresIndexDashboardUserProfitList, {params: params});
  }

  /**
   * 期货看板活跃用户列表
   */
  futuresIndexDashboardActiveSymbolList(standardSymbol: string, pageNo: string, pageSize: string) {
    const params = {
      standardSymbol: standardSymbol,
      pageNo: pageNo,
      pageSize: pageSize
    }
    return this.http.get(UrlConfig.futuresIndexDashboardActiveSymbolList, {params: params});
  }

  /**************************外汇看板*************************************/

  /**
   * 外汇看板meta信息
   */
  forexIndexDashboardMeta(standardSymbol: string) {
    return this.http.get(UrlConfig.forexIndexDashboardMeta, {params: {standardSymbol: standardSymbol}});
  }

  /**
   * 外汇看板活跃用户列表
   */
  forexDashboardActiveUserList(standardSymbol: string, pageNo: string, pageSize: string) {
    const params = {
      standardSymbol: standardSymbol,
      pageNo: pageNo,
      pageSize: pageSize
    }
    return this.http.get(UrlConfig.forexDashboardActiveUserList, {params: params});
  }

  /**
   * 外汇看板用户收益列表
   */
  forexDashboardUserProfitList(standardSymbol: string, pageNo: string, pageSize: string) {
    const params = {
      standardSymbol: standardSymbol,
      pageNo: pageNo,
      pageSize: pageSize
    }
    return this.http.get(UrlConfig.forexDashboardUserProfitList, {params: params});
  }

  /**
   * 外汇看板活跃品种列表
   */
  forexDashboardActiveSymbolList(standardSymbol: string, pageNo: string, pageSize: string) {
    const params = {
      standardSymbol: standardSymbol,
      pageNo: pageNo,
      pageSize: pageSize
    }
    return this.http.get(UrlConfig.forexDashboardActiveSymbolList, {params: params});
  }

}
