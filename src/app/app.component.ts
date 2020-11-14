import {Component, OnInit} from '@angular/core';
import {registerLocaleData} from "@angular/common";
import zh from "@angular/common/locales/zh";
import {HeaderMenu} from "../constant/HeaderMenu";
import {Router} from "@angular/router";
import {AppService} from "./app.service";
import {ObserverService} from "../service/local/observer.service";

registerLocaleData(zh)
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  headerMenu = [];
  selectedId = HeaderMenu.futures;
  showLeftPanel = false;
  isLoggedIn = false;
  constructor(private router: Router,
              private appService: AppService,
              private observerService: ObserverService) {}

  ngOnInit() {
    this.isLoggedIn = this.appService.isLogin;
    this.initHeaderMenu();
    // this.initObserver();

  }

  /**
   * 初始化观察者
   */
  initObserver() {
    this.observerService.getLoginObserver().subscribe((isLogin) => {
      if (!isLogin) {
        this.router.navigate(['./login']);
        return;
      }
      this.isLoggedIn = isLogin;
      this.renderTab(this.selectedId);
    });
  }

  /**
   * 渲染tab
   * @param item
   */
  renderTab(id) {
    this.selectedId = id;
    switch (id) {
      case HeaderMenu.data:
        this.showLeftPanel = true;
        this.router.navigate(['./symbol/profit']);
        break;
      case HeaderMenu.futures:
        this.showLeftPanel = false;
        this.router.navigate([`./dashboard/${HeaderMenu.futures}`]);
        break;
      case HeaderMenu.foreign_exchange:
        this.showLeftPanel = false;
        this.router.navigate([`./dashboard/${HeaderMenu.foreign_exchange}`]);
        break;
      case HeaderMenu.symbol:
        this.showLeftPanel = false;
        this.router.navigate([`./dashboard`]);
        break;
    }
  }

  /**
   * 初始化顶部菜单
   */
  private initHeaderMenu() {
    this.headerMenu = [
      {
        id: HeaderMenu.futures,
        title: '期货看板'
      },
      {
        id: HeaderMenu.foreign_exchange,
        title: '外汇看板'
      },
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
