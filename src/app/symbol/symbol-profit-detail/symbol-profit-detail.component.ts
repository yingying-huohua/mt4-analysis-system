import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseComponent} from '../../BaseComponent';
import {HttpService} from '../../../service/http/http.service';
import {AppService} from 'src/app/app.service';

@Component({
  selector: 'app-symbol-profit-detail',
  templateUrl: './symbol-profit-detail.component.html',
  styleUrls: ['./symbol-profit-detail.component.css']
})
export class SymbolProfitDetailComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() returnType; // 1:盈利， 2：亏损， 3：持平
  @Input() standardSymbol; //品种
  @Input() date; //日期
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
      returnType: this.returnType,
      standardSymbol: this.standardSymbol.trim(),
      sortField: this.sortField,
      direction: this.direction,
      openStart: this.date,
      openEnd: this.date,
      pageNo: this.pageNo.toString(),
      pageSize: this.pageSize.toString()
    }
    this.httpService.symbolProfitUserList(object).subscribe(observer);
  }

  moneyFormat(value) {
    return this.appService.moneyFormat(value.toString());
  }
}
