import { Component, OnInit } from '@angular/core';
import endOfMonth from 'date-fns/endOfMonth';
import {ModalService} from '../../modal.service';
/**
 * 用户收益
 */
@Component({
  selector: 'app-user-profit',
  templateUrl: './user-profit.component.html',
  styleUrls: ['./user-profit.component.css']
})
export class UserProfitComponent implements OnInit {
  listOfData = [];
  isLoading = true;
  isBorder  = true;
  pagination = true;
  nameInputValue?: string;
  nameOptions: string[] = [];
  symbolInputValue?:string;
  symbolOption: string[] = []
  minValue = -10;
  demoValue = 100;
  date = null;
  // ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };
  constructor(private modalService: ModalService ) { }

  ngOnInit(): void {
    this.initData();
  }


  private initData() {
    this.listOfData = [
      {
        id: '1',
        name: '张三',
        amount:'5000',
        incomeRate: '20%',
        symbol: 'superNB',
      },
      {
        id: '2',
        name: '李四',
        amount:'1000000',
        incomeRate: '20%',
        symbol: '苹果',
      }
    ];


    setTimeout(() => {
      this.isLoading = false
    }, 2 * 1000);
  }

  detail(item) {
    console.debug('查看详细:', item);
    this.modalService.showUserProfitDetail();
  }

  onNameInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.nameOptions = value ? [value, value + value, value + value + value] : [];
  }

  onSymbolInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.symbolOption = value ? [value, value + value, value + value + value] : [];
  }

  onChange(result: Date[]): void {
    console.log('From: ', result[0], ', to: ', result[1]);
  }

  search() {

  }
}
