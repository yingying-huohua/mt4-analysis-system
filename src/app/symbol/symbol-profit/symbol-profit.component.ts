import { Component, OnInit } from '@angular/core';
import {Config} from "../../../config/Config";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import * as moment from "moment";

@Component({
  selector: 'app-symbol-profit',
  templateUrl: './symbol-profit.component.html',
  styleUrls: ['./symbol-profit.component.css']
})
export class SymbolProfitComponent implements OnInit {
  showDetail = false;
  systemProfitList = [];
  isLoading = false;

  symbolInputValue = ''; // 品种输入框value
  symbolSuggestionList = []; //品种搜索联想
  date = null;
  openStart = ''; // 开仓时间
  openEnd = ''; // 关仓时间
  sortField = Config.sortField; // 排序字段
  direction = Config.direction; // 排序方式 desc|ase
  pageNo    = Config.defaultPageNo;
  pageSize  = Config.defaultPageSize;
  totalCount = 0;

  constructor() { }

  ngOnInit(): void {
  }

  initData() {

  }

  onPageIndexChange(pageNo) {

  }

  onQueryParamsChange(params: NzTableQueryParams) {
    console.log(params);
    const currentSort = params.sort.find(item => item.value !== null);
    this.sortField = (currentSort && currentSort.key) || 'id';
    const sortOrder = (currentSort && currentSort.value) || null;
    this.direction = Config.ASC
    if (!sortOrder || sortOrder === 'descend') {
      this.direction = Config.DESC;
    }

    this.initData();
  }

  detail(item) {
    this.showDetail = true;
  }

  search(pageNo) {
    this.showDetail = true;
    this.pageNo = pageNo;
    this.initData();
  }

  onSymbolInput(event: Event): void {
    // 初始化联想

  }

  onChange(result: Date[]): void {
    if (result.length === 0) {
      this.openStart = '';
      this.openEnd = '';
      return;
    }
    this.openStart = moment(result[0]).format('YYYY-MM-DD');
    this.openEnd = moment(result[1]).format('YYYY-MM-DD');
    // console.debug('From: ',  this.openStart, ', to: ',  this.openEnd);
  }
}
