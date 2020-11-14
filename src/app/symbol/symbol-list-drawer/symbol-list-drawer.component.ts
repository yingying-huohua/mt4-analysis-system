import {Component, OnInit} from '@angular/core';
import {Config} from "../../../config/Config";
import {HttpService} from "../../../service/http/http.service";
import {HeaderMenu} from "../../../constant/HeaderMenu";
import {NzDrawerRef} from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-symbol-list-drawer',
  templateUrl: './symbol-list-drawer.component.html',
  styleUrls: ['./symbol-list-drawer.component.css']
})
export class SymbolListDrawerComponent implements OnInit {
  symbolList = [];
  radioValue = HeaderMenu.foreign_exchange;
  constructor(private httpService: HttpService,
              private drawerRef: NzDrawerRef) { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    const observer = {
      next: response => {
        if (!response || !response.result) {
          return;
        }
        this.symbolList = response.result;
      }
    };
    this.httpService.symbolList(Config.defaultPageNo.toString(), Config.pageSize_1000.toString(),
      this.radioValue).subscribe(observer);
  }

  switchType() {
    this.initData();
  }

  selectedSymbol(symbolItem) {
    // console.debug('选中品种：', symbolItem);
    this.drawerRef.close();
    // TODO  选中品种，更新路由
  }
}
