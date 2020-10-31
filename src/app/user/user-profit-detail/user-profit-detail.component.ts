import {Component, Input, OnInit} from '@angular/core';
import {Config} from "../../../config/Config";
import {HttpService} from "../../../service/http/http.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";

@Component({
  selector: 'app-user-profit-detail',
  templateUrl: './user-profit-detail.component.html',
  styleUrls: ['./user-profit-detail.component.css']
})
export class UserProfitDetailComponent implements OnInit {
  @Input() accountId;
  @Input() symbol;
  @Input() openStart;
  @Input() openEnd;
  detailList = [];
  pageNo    = Config.defaultPageNo;
  pageSize  = Config.defaultPageSize;
  totalCount = 0;


  isLoading = true;

  sortField;
  direction;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.initData()
  }

  private initData() {
    const observer = {
      next: response => {
        this.isLoading = false;
        this.detailList = response.result;
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

  onPageIndexChange(pageNo) {
    this.pageNo = pageNo;
    this.initData()
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const currentSort = params.sort.find(item => item.value !== null);
    this.sortField = (currentSort && currentSort.key) || 'id';
    const sortOrder = (currentSort && currentSort.value) || null;
    this.direction = Config.ASC
    if (!sortOrder || sortOrder === 'descend') {
      this.direction = Config.DESC;
    }

    this.initData();
  }
}
