import { Component, OnInit } from '@angular/core';
import {ModalService} from "../../../service/local/modal.service";
import {HttpService} from "../../../service/http/http.service";
import {AppService} from "../../app.service";
import {Config} from "../../../config/Config";
import {BaseComponent} from "../../BaseComponent";

@Component({
  selector: 'app-user-profit-ranking',
  templateUrl: './user-profit-ranking.component.html',
  styleUrls: ['./user-profit-ranking.component.css']
})
export class UserProfitRankingComponent extends BaseComponent implements OnInit {

  constructor(private modalService: ModalService,
              private httpService: HttpService,
              private appService: AppService) {
    super();
  }

  ngOnInit(): void {}

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
