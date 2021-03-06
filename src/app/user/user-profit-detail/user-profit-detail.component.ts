import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpService} from "../../../service/http/http.service";
import {BaseComponent} from "../../BaseComponent";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-user-profit-detail',
  templateUrl: './user-profit-detail.component.html',
  styleUrls: ['./user-profit-detail.component.css']
})
export class UserProfitDetailComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() userId;
  @Input() accountId;
  @Input() standardSymbol = '';
  @Input() openStart;
  @Input() openEnd;

  constructor(private httpService: HttpService,
              private appService: AppService) {
    super();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (!changes.hasOwnProperty(key)) {
        continue;
      }

      if (changes[key].firstChange) {
        continue;
      }

      this.initData();
    }
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

    const object = {
      accountId: this.accountId,
      standardSymbol: this.standardSymbol,
      sortField: this.sortField,
      direction: this.direction,
      openStart: this.openStart,
      openEnd: this.openEnd,
      pageNo: this.pageNo.toString(),
      pageSize: this.pageSize.toString()
    };

    this.httpService.userProfitDetail(object).subscribe(observer)
  }

  moneyFormat(value) {
    return this.appService.moneyFormat(value.toString());
  }

}
