import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../../service/local/modal.service";
import {BaseComponent} from "../../BaseComponent";
import {HttpService} from "../../../service/http/http.service";

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


  constructor(private modalService: ModalService,
              private httpService: HttpService) {
    super();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
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

  detail(item) {
    console.debug('查看详细:', item);
    this.modalService.showUserProfitDetail();
  }

  groupProfitDetail() {
    this.showUserProfit = true;
  }

}
