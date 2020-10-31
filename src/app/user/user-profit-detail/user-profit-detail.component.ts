import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpService} from "../../../service/http/http.service";
import {BaseComponent} from "../../BaseComponent";

@Component({
  selector: 'app-user-profit-detail',
  templateUrl: './user-profit-detail.component.html',
  styleUrls: ['./user-profit-detail.component.css']
})
export class UserProfitDetailComponent extends BaseComponent implements OnInit, OnChanges {
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
