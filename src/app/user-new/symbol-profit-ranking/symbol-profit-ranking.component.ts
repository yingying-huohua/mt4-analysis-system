import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../../service/local/modal.service';
import {HttpService} from '../../../service/http/http.service';
import {AppService} from '../../app.service';
import {Config} from '../../../config/Config';
import {BaseComponent} from '../../BaseComponent';
import {FuturesService} from '../../../service/http/futures.service';

@Component({
  selector: 'app-symbol-profit-ranking',
  templateUrl: './symbol-profit-ranking.component.html',
  styleUrls: ['./symbol-profit-ranking.component.css']
})
export class SymbolProfitRankingComponent extends BaseComponent implements OnInit {

  constructor(private modalService: ModalService,
              private futuresService: FuturesService,
              private appService: AppService) {
    super();
  }

  ngOnInit(): void {}

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
      productId: this.productInputValue ? this.productInputValue.trim() :'',
      sortField: this.sortField,
      direction: this.direction,
      openStart: this.openStart,
      openEnd: this.openEnd,
      pageNo: this.pageNo.toString(),
      pageSize: this.pageSize.toString()
    }
    this.futuresService.symbolProfitList(object).subscribe(observer);
  }

  moneyFormat(value) {
    return this.appService.moneyFormat(value.toString());
  }

  dateTImeFormat(date) {
    return this.appService.dateTimeFormat(date);
  }
}
