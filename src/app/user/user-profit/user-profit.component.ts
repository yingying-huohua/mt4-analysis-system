import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../service/local/modal.service';
import {Config} from "../../../config/Config";
import {HttpService} from "../../../service/http/http.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import * as moment from 'moment';

/**
 * 用户收益
 */
@Component({
  selector: 'app-user-profit',
  templateUrl: './user-profit.component.html',
  styleUrls: ['./user-profit.component.css']
})
export class UserProfitComponent implements OnInit {
  userProfitList = [];
  isLoading = true;
  nameInputValue = ''; // 名称输入框value
  symbolInputValue = ''; // 品种输入框value
  nameSuggestionList = [];  // 名称联想
  symbolSuggestionList = []; //品种搜索联想
  minValue = ''; // 最小收益率
  maxValue = ''; // 最大收益率
  date = null;
  openStart = ''; // 开仓时间
  openEnd = ''; // 关仓时间
  sortField = Config.sortField; // 排序字段
  direction = Config.direction; // 排序方式 desc|ase
  pageNo    = Config.defaultPageNo;
  pageSize  = Config.defaultPageSize;
  totalCount = 0;

  // ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };
  constructor(private modalService: ModalService,
              private httpService: HttpService) { }

  ngOnInit(): void {
    this.initData();
  }

  onPageIndexChange(pageNo) {
    this.pageNo = pageNo;
    this.initData();
  }

  private initData() {
    const observer = {
      next: response => {
       this.isLoading = false;
       this.userProfitList = response.result;
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
    this.httpService.userProfitlist(object).subscribe(observer)
  }

  detail(item) {
    console.debug('查看详细:', item);
    this.modalService.showUserProfitDetail();
  }

  onNameInput(event: Event): void {
    // 初始化联想

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

  search(pageNo) {
    this.pageNo = pageNo;
    this.initData();
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

  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');

}
