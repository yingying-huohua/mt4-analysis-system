import { Component, OnInit } from '@angular/core';
import {ModalService} from "../../modal.service";

/**
 * 用户组收益
 */

@Component({
  selector: 'app-group-profit',
  templateUrl: './group-profit.component.html',
  styleUrls: ['./group-profit.component.css']
})
export class GroupProfitComponent implements OnInit {
  userGroupProfitList = [];
  userProfitList = [];
  isLoading = false;
  isBorder  = true;
  pagination = true;
  showUserProfit = false;


  listOfParentData= [];
  listOfChildrenData = [];
  constructor(private modalService: ModalService ) { }

  ngOnInit(): void {
    this.initData();
  }

  private initData() {
    this.userGroupProfitList = [
      {
        id: '1',
        name: '超级牛散群',
        amount:'20000',
        incomeRate: '20%',
        peopleNum: '20',
        symbol: 'superNB',
      }
    ];

    this.userProfitList = [
      {
        id: '1',
        name: '张三',
        incomeRate: '20%',
        symbol: 'superNB',
      },
      {
        id: '2',
        name: '李四',
        incomeRate: '20%',
        symbol: '苹果',
      }
    ]

    for (let i = 0; i < 3; ++i) {
      this.listOfParentData.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
        expand: false
      });
    }
    for (let i = 0; i < 3; ++i) {
      this.listOfChildrenData.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56'
      });
    }

  }

  detail(item) {
    console.debug('查看详细:', item);
    this.modalService.showUserProfitDetail();
  }

  groupProfitDetail() {
    this.showUserProfit = true;
  }
}
