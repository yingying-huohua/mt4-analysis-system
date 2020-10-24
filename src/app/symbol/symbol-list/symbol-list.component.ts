import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../modal.service';
import {SymbolOperationType} from '../../../constant/SymbolOperationType';
import {HttpService} from "../../../service/http.service";

@Component({
  selector: 'app-symbol-list',
  templateUrl: './symbol-list.component.html',
  styleUrls: ['./symbol-list.component.css']
})
export class SymbolListComponent implements OnInit {
  listOfData = [];
  isLoading = true;
  isBorder  = true;
  pagination = true;
  constructor(private modalService: ModalService,
              private httpService: HttpService) { }

  ngOnInit(): void {
    this.initData();
    this.initObserver();
  }

  initObserver() {

  }

  edit(item) {
    this.modalService.showSymbolAddModal(SymbolOperationType.update, item);
  }

  add() {
    this.modalService.showSymbolAddModal(SymbolOperationType.add, null);
  }

  // 数值排序
  sort(a, b) {
    return a.age - b.age
  }

  private initData() {
    const observer = {
      next: response => {
        console.debug(response);
        this.listOfData = response.result;
        this.isLoading = false;
      }
    };
    this.httpService.symbolList().subscribe(observer);
  }
}
