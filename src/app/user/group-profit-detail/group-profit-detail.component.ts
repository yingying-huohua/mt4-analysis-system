import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseComponent} from "../../BaseComponent";
import {HttpService} from "../../../service/http/http.service";

@Component({
  selector: 'app-group-profit-detail',
  templateUrl: './group-profit-detail.component.html',
  styleUrls: ['./group-profit-detail.component.css']
})
export class GroupProfitDetailComponent extends BaseComponent implements OnInit, OnChanges {

  constructor(private httpService: HttpService) {
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
    this.isLoading = false;
    // 用户组中用户收益列表
  }

  detail(item) {

  }
}
