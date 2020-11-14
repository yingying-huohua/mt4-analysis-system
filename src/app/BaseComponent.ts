import * as moment from "moment";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {Config} from "../config/Config";
import {LocalstorageKey} from "../constant/LocalstorageKey";

/**
 * 基类
 *@author kyy
 *@date 2020/10/31 11:00
 */
export class BaseComponent {
  selectedIndex;
  dataList = [];
  isLoading = true; // 是否显示加载页面
  date = null;
  openStart = ''; // 开仓时间
  openEnd = ''; // 关仓时间
  ranges = {};
  sortField = Config.sortField; // 排序字段
  direction = Config.direction; // 排序方式 desc|ase
  pageNo    = Config.defaultPageNo;
  pageSize  = Config.defaultPageSize;

  nameInputValue = ''; // 名称输入框value
  symbolInputValue = ''; // 品种输入框value
  nameSuggestionList = [];  // 名称联想
  symbolSuggestionList = []; //品种搜索联想
  minValue = ''; // 最小收益率
  maxValue = ''; // 最大收益率

  totalCount = 0;

  isResetSuggestion = true;
  constructor() {
    this.initDafaultDate();
    this.initDateRange();
    this.initSymbolSuggestionList();
  }

  /**
   * 初始化时间选择显示的默认时间
   */
  private initDafaultDate() {
    const startDate = new Date(new Date().setDate(new Date().getDate() - 30));
    const endDate = new Date();

    this.openStart = moment(startDate).format('YYYY-MM-DD');
    this.openEnd   = moment(endDate).format('YYYY-MM-DD');

    this.date = [this.openStart, this.openEnd];
  }

  private initDateRange() {
    const one_week = new Date(new Date().setDate(new Date().getDate() - 7));
    const one_month = new Date(new Date().setDate(new Date().getDate() - 30));
    const half_year = new Date(new Date().setDate(new Date().getDate() - 120));
    const one_year = new Date(new Date().setDate(new Date().getDate() - 365));
    const today = new Date();
    this.ranges = {
      '今天':   [today, today],
      '近一周': [one_week, today],
      '近一月': [one_month, today],
      '近半年': [half_year, today],
      '近一年': [one_year,  today]
    };
  }

  private initSymbolSuggestionList() {
    const listStr = localStorage.getItem(LocalstorageKey.symbol_list);
    if (!listStr) {
      return;
    }
    this.symbolSuggestionList = JSON.parse(listStr);
    // this.symbolInputValue = this.symbolSuggestionList[1].symbol;

  }

  /**
   * 初始化名称输入框联想数据
   * @param searchText
   */
  initNameSuggestionList(searchText) {}


  /**
   * 初始化数据
   */
  initData() {
    this.isLoading = true;
  }

  /**
   * 列表翻页触发事件
   * @param pageNo
   */
  onPageIndexChange(pageNo) {
    this.pageNo = pageNo;
    this.initData();
  }

  /**
   * 排序字段改变
   * @param params
   */
  onQueryParamsChange(params: NzTableQueryParams) {
    // console.log(params);
    const currentSort = params.sort.find(item => item.value !== null);
    this.sortField = (currentSort && currentSort.key) || Config.sortField;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.direction = Config.ASC
    if (!sortOrder || sortOrder === 'descend') {
      this.direction = Config.DESC;
    }

    this.initData();
  }

  /**
   * 选择日期
   * @param result
   */
  onDateChange(result: Date[]) {
    if (result.length === 0) {
      this.openStart = '';
      this.openEnd = '';
      return;
    }
    this.openStart = moment(result[0]).format('YYYY-MM-DD');
    this.openEnd   = moment(result[1]).format('YYYY-MM-DD');
    this.initData();
  }

  /**
   * 名称输入框
   * @param event
   */
  onNameInput(value): void {
    console.debug('名称输入框', value);
    if (value.trim().length === 0) {
      this.nameSuggestionList = [];
      return;
    }

    if (!this.isResetSuggestion) {
      return;
    }
    this.isResetSuggestion = false;
    // 初始化联想
    this.initNameSuggestionList(value);
    // 延迟500ms后，将isResetSuggestion设置为true；
    setTimeout(() => {
      this.isResetSuggestion = true;
    }, 500);
  }

  /**
   * 选中联想item
   * @param value
   */
  selectedNameSuggestionItem(value) {
    this.nameInputValue = value;
    this.search(1);
  }

  /**
   * 品种输入框
   * @param event
   */
  onSymbolInput(event: Event): void {
    // 初始化联想
    // console.debug('品种输入框option改变：', event);
    this.initData();
  }

  /**
   * 点击查询
   * @param pageNo
   */
  search(pageNo) {
    this.pageNo = pageNo;
    this.initData();
  }

  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');
}
