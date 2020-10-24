import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../modal.service';
import {SymbolOperationType} from '../../../constant/SymbolOperationType';

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
  constructor(private modalService: ModalService) { }

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
    this.listOfData = [];
    for (let i = 1; i< 61; i++) {
      let object;
      switch (i % 3) {
        case 0:
          object =  {
            id: i.toString(),
            name: 'John Brown',
            symbol: i,
            standardSymbol: 'New York No. 1 Lake Park'
          }
          break;
        case 1:
          object = {
            id: i.toString(),
            name: 'Jim Green',
            symbol: i,
            standardSymbol: 'London No. 1 Lake Park'
          }
          break;
        case 2:
          object =  {
            id: i.toString(),
            name: 'Joe Black',
            symbol: i,
            standardSymbol: 'Sidney No. 1 Lake Park'
          }
          break;
      }
      this.listOfData.push(object);
    }

    setTimeout(() => {
      this.isLoading = false
    }, 2 * 1000);
  }
}
