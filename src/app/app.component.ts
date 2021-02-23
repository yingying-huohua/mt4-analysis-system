import {Component, OnDestroy, OnInit} from '@angular/core';
import {registerLocaleData} from "@angular/common";
import zh from "@angular/common/locales/zh";
import {HeaderMenu} from "../constant/HeaderMenu";
import {NavigationEnd, Router} from "@angular/router";
import {AppService} from "./app.service";
import {ObserverService} from "../service/local/observer.service";

registerLocaleData(zh)
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  headerMenu = [];
  selectedId = HeaderMenu.data;
  showLeftPanel = false;
  isLoggedIn = false;
  loginSubscription;
  constructor(private router: Router,
              private appService: AppService,
              private observerService: ObserverService) {}

  ngOnInit() {
    this.init();
    this.initHeaderMenu();
    this.initObserver();
    this.appService.saveSymbolListToStorage();
    this.appService.saveFutureProductToStorage();
    this.appService.saveUserListToStorage();
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  init() {
    this.isLoggedIn = this.checkLogin();
    // 若未登录，显示登录页面， 隐藏顶部与左侧tab
    if (!this.isLoggedIn) {
      this.router.navigate(['./login']);
    }

  }

  /**
   * 初始化观察者
   */
  initObserver() {
    this.loginSubscription = this.observerService.getLoginObserver().subscribe((isLogin) => {
      if (!isLogin) {
        return;
      }
      this.isLoggedIn = isLogin;
      this.renderTab(this.selectedId);
      localStorage.setItem('isLogin', JSON.stringify(isLogin));
    });

    this.observerService.getLoginoutObserver().subscribe((isLogout) => {
      if (!isLogout) {
        return;
      }
      // 更新标识
      this.isLoggedIn = false;
      // 显示登录页面
      this.router.navigate(['./login']);
      // 删除localstorage维护数据
      localStorage.removeItem('isLogin');
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // 检查路由，选中顶部导航对应tab
        if (event.url.indexOf(`dashboard/${HeaderMenu.foreign_exchange}`) > -1) {
          this.selectedId = HeaderMenu.foreign_exchange;
        } else if (event.url.indexOf(`dashboard/${HeaderMenu.symbol}`) > -1) {
          this.selectedId = HeaderMenu.symbol;
        } else {
          this.selectedId = HeaderMenu.data;
        }

        if (event.url.indexOf('dashboard') > -1) {
          this.showLeftPanel = false;
          return;
        }
        this.showLeftPanel = true;
      }
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
        this.router.navigate(['./user/profit/ranking']);
        break;
      case HeaderMenu.futures:
        this.showLeftPanel = false;
        this.router.navigate([`./dashboard/${HeaderMenu.futures}/`]);
        break;
      case HeaderMenu.foreign_exchange:
        this.showLeftPanel = false;
        this.router.navigate([`./dashboard/${HeaderMenu.foreign_exchange}/`]);
        break;
      case HeaderMenu.symbol:
        this.showLeftPanel = false;
        this.router.navigate([`./dashboard/${HeaderMenu.symbol}/`]);
        break;
    }
  }

  /**
   * 初始化顶部菜单
   */
  private initHeaderMenu() {
    this.headerMenu = [
      {
        id: HeaderMenu.data,
        title: '数据分析'
      },
      // {
      //   id: HeaderMenu.futures,
      //   title: '期货看板'
      // },
      {
        id: HeaderMenu.foreign_exchange,
        title: '外汇看板'
      },
      {
        id: HeaderMenu.symbol,
        title: '品种看板'
      }
    ]
  }

  private checkLogin(): boolean {
    const str = localStorage.getItem('isLogin');
    if (!str) {
      return false;
    }
    return str == 'true';
  }
}
