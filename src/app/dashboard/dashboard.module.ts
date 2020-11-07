import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { TotalProfitComponent } from './total-profit/total-profit.component';
import { TotalUserComponent } from './total-user/total-user.component';
import { SymbolTrendComponent } from './symbol-trend/symbol-trend.component';
import { ProfitDistributedComponent } from './profit-distributed/profit-distributed.component';
import { ActiveUserListComponent } from './active-user-list/active-user-list.component';
import { ActiveUserDistributedComponent } from './active-user-distributed/active-user-distributed.component';
import { UserProfitListComponent } from './user-profit-list/user-profit-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TotalProfitComponent,
    TotalUserComponent,
    SymbolTrendComponent,
    ProfitDistributedComponent,
    ActiveUserListComponent,
    ActiveUserDistributedComponent,
    UserProfitListComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
