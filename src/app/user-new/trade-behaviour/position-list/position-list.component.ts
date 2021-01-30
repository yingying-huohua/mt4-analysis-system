import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseComponent} from "../../../BaseComponent";
import {FuturesService} from "../../../../service/http/futures.service";
import {AppService} from "../../../app.service";

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent extends BaseComponent implements OnInit, OnChanges {
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

    const object = {
      accountIds: this.userSelectValue.length ? this.userSelectValue.join(',') : '',
      sortField: this.sortField,
      direction: this.direction,
      openStart: this.openStart,
      openEnd: this.openEnd,
      pageNo: this.pageNo.toString(),
      pageSize: this.pageSize.toString()
    }
    this.httpService.positionList(object).subscribe(observer);
  }

  moneyFormat(value) {
    return this.appService.moneyFormat(value.toString());
  }
}
