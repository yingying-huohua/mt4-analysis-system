import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../../../service/http/http.service";
import {BaseComponent} from "../../BaseComponent";

@Component({
  selector: 'app-user-profit-detail',
  templateUrl: './user-profit-detail.component.html',
  styleUrls: ['./user-profit-detail.component.css']
})
export class UserProfitDetailComponent extends BaseComponent implements OnInit {
  @Input() accountId;
  @Input() symbol;
  @Input() openStart;
  @Input() openEnd;

  constructor(private httpService: HttpService) {
    super();
  }

  ngOnInit(): void {
    this.initData()
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
      accountId: this.accountId,
      symbol: this.symbol,
      sortField: this.sortField,
      direction: this.direction,
      openStart: this.openStart,
      openEnd: this.openEnd,
      pageNo: this.pageNo.toString(),
      pageSize: this.pageSize.toString()
    };

    this.httpService.userProfitDetail(object).subscribe(observer)
  }

}
