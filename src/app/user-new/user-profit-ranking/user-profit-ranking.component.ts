import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../../service/local/modal.service";
import {AppService} from "../../app.service";
import {BaseComponent} from "../../BaseComponent";
import {FuturesService} from "../../../service/http/futures.service";

@Component({
  selector: 'app-user-profit-ranking',
  templateUrl: './user-profit-ranking.component.html',
  styleUrls: ['./user-profit-ranking.component.css']
})
export class UserProfitRankingComponent extends BaseComponent implements OnInit {

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
      accountIds: this.userSelectValue.length !== 0 ?  this.userSelectValue.join(',') : '',
      productId: this.productInputValue ? this.productInputValue.trim() :'',
      sortField: this.sortField,
      direction: this.direction,
      openStart: this.openStart,
      openEnd: this.openEnd,
      pageNo: this.pageNo.toString(),
      pageSize: this.pageSize.toString()
    }

    this.futuresService.userProfitList(object).subscribe(observer);
  }


  moneyFormat(value) {
    return this.appService.moneyFormat(value.toString());
  }

}
