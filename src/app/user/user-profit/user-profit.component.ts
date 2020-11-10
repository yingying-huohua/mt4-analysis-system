import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../service/local/modal.service';
import {HttpService} from "../../../service/http/http.service";
import {BaseComponent} from "../../BaseComponent";
import {AppService} from "../../app.service";

// @ts-ignore
/**
 * 用户收益
 */
@Component({
  selector: 'app-user-profit',
  templateUrl: './user-profit.component.html',
  styleUrls: ['./user-profit.component.css']
})
export class UserProfitComponent extends BaseComponent implements OnInit {
  showDetail = false;
  accountId;
  userId;
  constructor(private modalService: ModalService,
              private httpService: HttpService,
              private appService: AppService) {
    super();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    const observer = {
      next: response => {
       this.isLoading = false;
       this.dataList = response.result;
       this.totalCount = response.count;
      }
    };

    const object = {
      accountId: this.nameInputValue,
      symbol: this.symbolInputValue,
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

  detail(item) {
    this.showDetail = true;
    this.accountId = item.accountId;
    this.userId    = item.userId;
  }

  moneyFormat(value) {
    return this.appService.moneyFormat(value.toString());
  }

}
