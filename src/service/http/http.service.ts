import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlConfig} from "../../config/UrlConfig";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
   * 品种列表
   */
  symbolList() {
    return this.http.get(UrlConfig.symbolList);
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
}
