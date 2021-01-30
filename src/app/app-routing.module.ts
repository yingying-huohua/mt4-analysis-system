import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserProfitComponent} from './user/user-profit/user-profit.component';
import {GroupProfitComponent} from './user/group-profit/group-profit.component';
import {SymbolProfitComponent} from './symbol/symbol-profit/symbol-profit.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SymbolAddComponent} from './setting/symbol-add/symbol-add.component';
import {SymbolListComponent} from './symbol/symbol-list/symbol-list.component';
import {MenuComponent} from './menu/menu.component';
import {LoginComponent} from './setting/login/login.component';
import {UserProfitRankingComponent} from "./user-new/user-profit-ranking/user-profit-ranking.component";
import {TradeBehaviourComponent} from "./user-new/trade-behaviour/trade-behaviour.component";
import {SymbolProfitRankingComponent} from "./user-new/symbol-profit-ranking/symbol-profit-ranking.component";


const routes: Routes = [
  {path: '',                redirectTo: 'user/profit/ranking',  pathMatch: 'full'},
  {path: 'login',           component: LoginComponent},
  {path: 'dashboard',       component: DashboardComponent},
  {path: 'dashboard/:category',   component: DashboardComponent},
  {path: 'dashboard/:category/:id',   component: DashboardComponent},
  {path: 'menu',            component: MenuComponent},
  {path: 'symbol',          component: SymbolListComponent},
  {path: 'symbol/profit',   component: SymbolProfitComponent},
  {path: 'symbol/profit/:type',   component: SymbolProfitComponent},
  {path: 'user/profit',     component: UserProfitComponent},
  {path: 'group/profit',    component: GroupProfitComponent},
  {path: 'setting',         loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)},
  {path: 'symbol/add',      component: SymbolAddComponent},

  {path: 'user/profit/ranking',     component: UserProfitRankingComponent},
  {path: 'product/profit/ranking',     component: SymbolProfitRankingComponent},
  {path: 'trade/behaviour',         component: TradeBehaviourComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
