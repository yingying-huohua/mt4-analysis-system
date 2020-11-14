import {Component, OnInit} from '@angular/core';
import {Config} from "../../../config/Config";
import {HttpService} from "../../../service/http/http.service";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {Router} from "@angular/router";
import {HeaderMenuTitle} from "../../../constant/HeaderMenu";

@Component({
  selector: 'app-symbol-list-drawer',
  templateUrl: './symbol-list-drawer.component.html',
  styleUrls: ['./symbol-list-drawer.component.css']
})
export class SymbolListDrawerComponent implements OnInit {
  symbolList = [];
  radioValue = HeaderMenuTitle.foreign_exchange;
  constructor(private httpService: HttpService,
              private drawerRef: NzDrawerRef,
              private router: Router) { }

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
    this.drawerRef.close();
    this.router.navigate([`./dashboard/symbol/${symbolItem.symbol}`]);
  }
}
