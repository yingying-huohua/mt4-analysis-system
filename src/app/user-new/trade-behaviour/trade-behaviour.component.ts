import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../BaseComponent";
import {HeaderMenuTitle} from "../../../constant/HeaderMenu";
import {Config} from "../../../config/Config";
import {HttpService} from "../../../service/http/http.service";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-trade-behaviour',
  templateUrl: './trade-behaviour.component.html',
  styleUrls: ['./trade-behaviour.component.css']
})
export class TradeBehaviourComponent extends BaseComponent implements OnInit {
  radioValue = HeaderMenuTitle.foreign_exchange;
  constructor(private httpService: HttpService,
              private appService: AppService) {
    super();
  }

  ngOnInit(): void {
  }

  switchType() {
    console.debug('切换tab')
  }

  initData() {
    super.initData();
    const observer = {
      next: response => {
        this.isLoading = false;
        this.dataList = response.result;
        this.totalCount = response.count;
      }
    };

    console.debug(this.nameInputValue);

    const object = {
      accountId: this.nameInputValue ? this.nameInputValue.trim() : '',
      standardSymbol:    this.symbolInputValue ? this.symbolInputValue.trim() :'',
      minReturn: this.minValue,
      maxReturn: this.maxValue,
      sortField: this.sortField,
      direction: this.direction,
      openStart: this.openStart,
      openEnd: this.openEnd,
      pageNo: this.pageNo.toString(),
      pageSize: this.pageSize.toString()
    }
    this.httpService.userProfitlist(object).subscribe(observer);
  }

  initNameSuggestionList(searchText){
    const observer = {
      next: response => {
        if (!response || !response.result) {
          return;
        }
        this.nameSuggestionList = response.result
      }
    };
    this.httpService.userList(searchText, Config.defaultPageNo.toString(),
      Config.defaultPageSize.toString()).subscribe(observer);
  }

  moneyFormat(value) {
    return this.appService.moneyFormat(value.toString());
  }
}
