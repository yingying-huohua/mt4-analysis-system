import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../../service/local/modal.service";
import {BaseComponent} from "../../BaseComponent";
import {HttpService} from "../../../service/http/http.service";
import {AppService} from "../../app.service";

/**
 * 用户组收益
 */

@Component({
  selector: 'app-group-profit',
  templateUrl: './group-profit.component.html',
  styleUrls: ['./group-profit.component.css']
})
export class GroupProfitComponent extends BaseComponent implements OnInit {
  showUserProfit = false;
  currentGroupId;

  constructor(private modalService: ModalService,
              private httpService: HttpService,
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
      groupName: '',
      sortField: this.sortField,
      direction: this.direction,
      openStart: this.openStart,
      openEnd: this.openEnd,
      pageNo: this.pageNo.toString(),
      pageSize: this.pageSize.toString()
    }
    this.httpService.groupProfitList(object).subscribe(observer);

  }

  groupProfitDetail(item) {
    console.debug('查看详细:', item);
    this.showUserProfit = true;
    this.currentGroupId = item.groupId;
  }

  moneyFormat(value) {
    return this.appService.moneyFormat(value.toString());
  }

  dateFormat(date) {
    return this.appService.dateFormat(date);
  }
}
