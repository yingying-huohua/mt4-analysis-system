import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseComponent} from "../../../BaseComponent";
import {FuturesService} from "../../../../service/http/futures.service";
import {AppService} from "../../../app.service";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() userSelectValue = [];
  @Input() openStart = '';
  @Input() openEnd = '';

  constructor(private httpService: FuturesService,
              private appService: AppService) {
    super();
  }

  ngOnInit(): void {
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

        console.debug('初始化交易', response);
      }
    };


    // account_id: "2019010"
    // close_profit: 4060
    // exchange_margin: 0
    // position_profit: -16680



    const object = {
      accountIds: this.userSelectValue.length ? this.userSelectValue.join(',') : '',
      sortField: this.sortField,
      direction: this.direction,
      openStart: this.openStart,
      openEnd: this.openEnd,
      pageNo: this.pageNo.toString(),
      pageSize: this.pageSize.toString()
    }
    this.httpService.accountList(object).subscribe(observer);
  }

  moneyFormat(value) {
    return this.appService.moneyFormat(value.toString());
  }
}
