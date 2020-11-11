import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../BaseComponent";
import {HttpService} from "../../../service/http/http.service";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-symbol-profit',
  templateUrl: './symbol-profit.component.html',
  styleUrls: ['./symbol-profit.component.css']
})
export class SymbolProfitComponent extends BaseComponent implements OnInit {
  showDetail = false;
  currentSymbol;
  currentReturnType;
  constructor(private httpService: HttpService,
              private route: ActivatedRoute,
              private appService: AppService) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: {type: string}) => {
      this.initData(params.type);
    });
  }

  initData(type?) {
    super.initData();
    const observer = {
      next: response => {
        this.isLoading = false;
        this.dataList = response.result;
        this.totalCount = response.count;
      }
    };

    const object = {
      type: type? type : '',
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


  detail(item, returnType, index) {
    console.debug('查看详情:', item);
    this.currentSymbol = item.symbol;
    this.currentReturnType = returnType;
    this.selectedIndex = index;
    this.showDetail = true;
  }

  rateForamt(value) {
    return this.appService.rateFormat(value);
  }

  dateFormat(date) {
    return this.appService.dateFormat(date);
  }
}
