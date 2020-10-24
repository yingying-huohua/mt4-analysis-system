import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profit-detail',
  templateUrl: './user-profit-detail.component.html',
  styleUrls: ['./user-profit-detail.component.css']
})
export class UserProfitDetailComponent implements OnInit {
  listOfData = [];
  isLoading = true;
  isBorder  = true;
  pagination = true;
  constructor() { }

  ngOnInit(): void {
    this.initData()
  }

  private initData() {
    for (let i = 0; i < 15; i++) {
      const object =  {
          id: '1',
          name: '张三',
          abbreviation: '苹果',
          incomeAverageRate: '20%',
          symbol: 'superNB'
        }
      this.listOfData.push(object);
    }

    setTimeout(() => {
      this.isLoading = false
    }, 2 * 1000);
  }

}
