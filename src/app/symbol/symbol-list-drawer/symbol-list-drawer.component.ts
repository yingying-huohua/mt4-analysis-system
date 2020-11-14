import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../service/http/http.service";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {Router} from "@angular/router";
import {HeaderMenuTitle} from "../../../constant/HeaderMenu";
import {AppService} from "../../app.service";

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
              private router: Router,
              private appService: AppService) { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.symbolList = this.appService.getSymbolListFromStorage(this.radioValue);
  }

  switchType() {
    this.initData();
  }

  selectedSymbol(symbolItem) {
    this.drawerRef.close();
    this.appService.currentSymbol = symbolItem.standardSymbol
    this.router.navigate([`./dashboard/symbol/${symbolItem.standardSymbol}`]);
  }
}
