import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../service/local/modal.service';
import {SymbolOperationType} from '../../../constant/SymbolOperationType';
import {HttpService} from "../../../service/http/http.service";
import {Config} from "../../../config/Config";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-symbol-list',
  templateUrl: './symbol-list.component.html',
  styleUrls: ['./symbol-list.component.css']
})
export class SymbolListComponent implements OnInit {
  pageNo   = Config.defaultPageNo;
  pageSize = Config.defaultPageSize;
  totalCount = 0;
  symbolList = [];
  isLoading = true;
  constructor(private modalService: ModalService,
              private httpService: HttpService,
              private message: NzMessageService) { }

  ngOnInit(): void {
    this.initData();
    this.initObserver();
  }

  initObserver() {

  }

  edit(item) {
    this.modalService.showSymbolAddModal(SymbolOperationType.update, item).afterClose.subscribe((result) => {
      if (!result) {
        return;
      }
      this.message.success('品种更新成功');
      this.initData();
    });
  }

  add() {
    this.modalService.showSymbolAddModal(SymbolOperationType.add, null).afterClose.subscribe((result) => {
      if (!result) {
        return;
      }
      this.message.success('品种新增成功');
      this.initData();
    });
  }

  // 获取素材概要信息
  onPageIndexChange(pageNo) {
    this.pageNo = pageNo ? pageNo : this.pageNo;
    this.initData();

  }

  // 数值排序
  sort(a, b) {
    return a.age - b.age
  }

  private initData() {
    this.isLoading = true;
    const observer = {
      next: response => {
        this.symbolList = response.result;
        this.isLoading = false;
        this.pageNo = response.currentPage;
        this.totalCount = response.count;
      }
    };
    this.httpService.symbolList(this.pageNo.toString(), this.pageSize.toString()).subscribe(observer);
  }

}
