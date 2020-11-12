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
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NgxEchartsModule} from "ngx-echarts";
import {NzProgressModule} from "ng-zorro-antd/progress";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzAutocompleteModule} from "ng-zorro-antd/auto-complete";
import { ActiveSymbolListComponent } from './active-symbol-list/active-symbol-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TotalProfitComponent,
    TotalUserComponent,
    SymbolTrendComponent,
    ProfitDistributedComponent,
    ActiveUserListComponent,
    ActiveUserDistributedComponent,
    UserProfitListComponent,
    ActiveSymbolListComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzSpinModule,
    NgxEchartsModule,
    NzProgressModule,
    NzGridModule,
    NzTableModule,
    NzAutocompleteModule
  ]
})
export class DashboardModule { }
