import {Component, OnInit} from '@angular/core';
import {registerLocaleData} from "@angular/common";
import zh from "@angular/common/locales/zh";
import {HeaderMenu} from "../constant/HeaderMenu";
import {Router} from "@angular/router";
registerLocaleData(zh)
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'md4-analysis-system';
  headerMenu = [];
  selectedId = HeaderMenu.symbol;
  showLeftPanel = false;
  constructor(private router: Router) {}

  ngOnInit() {
    this.initHeaderMenu();
    this.renderTab(this.selectedId)
  }

  /**
   * 渲染tab
   * @param item
   */
  renderTab(id) {
    this.selectedId = id;
    switch (id) {
      // case HeaderMenu.total:
      //   break;
      case HeaderMenu.data:
        this.showLeftPanel = true;
        this.router.navigate(['./']);
        break;
      case HeaderMenu.symbol:
        this.showLeftPanel = false;
        this.router.navigate(['./dashboard']);
        break;
    }
  }

  /**
   * 初始化顶部菜单
   */
  private initHeaderMenu() {
    this.headerMenu = [
      // {
      //   id: HeaderMenu.total,
      //   title: '综合看板'
      // },
      {
        id: HeaderMenu.symbol,
        title: '品种看板'
      },
      {
        id: HeaderMenu.data,
        title: '数据分析'
      }

    ]
  }
}
