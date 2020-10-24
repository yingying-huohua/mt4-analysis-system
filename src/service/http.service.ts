import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlConfig} from "../config/UrlConfig";

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
}
