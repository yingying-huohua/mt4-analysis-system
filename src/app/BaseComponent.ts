import * as moment from "moment";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {Config} from "../config/Config";

/**
 * 基类
 *@author kyy
 *@date 2020/10/31 11:00
 */
export class BaseComponent {
  dataList = [];
  isLoading = true; // 是否显示加载页面
  date = null;
  openStart = ''; // 开仓时间
  openEnd = ''; // 关仓时间
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

  /**
   * 初始化数据
   */
  initData() {

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
    this.openEnd = moment(result[1]).format('YYYY-MM-DD');
  }

  /**
   * 名称输入框
   * @param event
   */
  onNameInput(event: Event): void {
    // 初始化联想

  }

  /**
   * 品种输入框
   * @param event
   */
  onSymbolInput(event: Event): void {
    // 初始化联想

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
