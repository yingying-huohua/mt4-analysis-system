import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserProfitComponent} from './user/user-profit/user-profit.component';
import {GroupProfitComponent} from './user/group-profit/group-profit.component';
import {SymbolProfitComponent} from './symbol/symbol-profit/symbol-profit.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SymbolAddComponent} from './setting/symbol-add/symbol-add.component';
import {SymbolListComponent} from './symbol/symbol-list/symbol-list.component';
import {MenuComponent} from './menu/menu.component';


const routes: Routes = [
  {path: '',                redirectTo: '',  pathMatch: 'full'},
  {path: 'dashboard',       component: DashboardComponent},
  {path: 'menu',            component: MenuComponent},
  {path: 'symbol',          component: SymbolListComponent},
  {path: 'symbol/profit',   component: SymbolProfitComponent},
  {path: 'user/profit',     component: UserProfitComponent},
  {path: 'group/profit',    component: GroupProfitComponent},
  {path: 'setting',         loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)},
  {path: 'symbol/add',      component: SymbolAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
