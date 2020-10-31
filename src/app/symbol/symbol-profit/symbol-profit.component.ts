import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../BaseComponent";
import {HttpService} from "../../../service/http/http.service";

@Component({
  selector: 'app-symbol-profit',
  templateUrl: './symbol-profit.component.html',
  styleUrls: ['./symbol-profit.component.css']
})
export class SymbolProfitComponent extends BaseComponent implements OnInit {
  showDetail = false;
  currentSymbol;
  currentReturnType;
  constructor(private httpService: HttpService) {
    super();
  }

  ngOnInit(): void {
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
      symbol: this.symbolInputValue,
      sortField: this.sortField,
      direction: this.direction,
      openStart: this.openStart,
      openEnd: this.openEnd,
      pageNo: this.pageNo.toString(),
      pageSize: this.pageSize.toString()
    }
    this.httpService.symbolProfitList(object).subscribe(observer);
  }


  detail(item, returnType) {
    console.debug('查看详情');
    this.currentSymbol = item.symbol;
    this.currentReturnType = returnType;
    this.showDetail = true;
  }
}
