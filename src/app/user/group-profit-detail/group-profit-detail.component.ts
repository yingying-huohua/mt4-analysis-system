import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseComponent} from "../../BaseComponent";
import {HttpService} from "../../../service/http/http.service";
import {ModalService} from "../../../service/local/modal.service";

@Component({
  selector: 'app-group-profit-detail',
  templateUrl: './group-profit-detail.component.html',
  styleUrls: ['./group-profit-detail.component.css']
})
export class GroupProfitDetailComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() groupId;
  constructor(private httpService: HttpService,
              private modalService: ModalService) {
    super();
  }

  ngOnInit(): void {
    this.initData()
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

    // 用户组中用户收益列表
    const observable = {
      next: response => {
        console.debug(response);
        this.isLoading = false;
        this.totalCount = response.count;
        this.dataList = response.result;
      }
    }

    const params = {
      groupId: this.groupId,
      pageNo: this.pageNo.toString(),
      pageSize: this.pageSize.toString()
    }
    this.httpService.groupMemberList(params).subscribe(observable)
  }

  detail(item) {
    this.modalService.showUserProfitDetail(item.accountId);
  }
}
