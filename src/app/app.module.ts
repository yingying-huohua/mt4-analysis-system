import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SymbolProfitComponent} from './symbol/symbol-profit/symbol-profit.component';
import {UserProfitComponent} from './user/user-profit/user-profit.component';
import {GroupProfitComponent} from './user/group-profit/group-profit.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {SettingModule} from './setting/setting.module';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {SymbolAddComponent} from './setting/symbol-add/symbol-add.component';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {SymbolListComponent} from './symbol/symbol-list/symbol-list.component';
import {LoginComponent} from './setting/login/login.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {UserProfitDetailComponent} from './user/user-profit-detail/user-profit-detail.component';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n';
import {HttpClientModule} from '@angular/common/http';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {MenuComponent} from './menu/menu.component';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzGridModule} from "ng-zorro-antd/grid";
import { SymbolProfitDetailComponent } from './symbol/symbol-profit-detail/symbol-profit-detail.component';
import { GroupProfitDetailComponent } from './user/group-profit-detail/group-profit-detail.component';
import { SymbolListDrawerComponent } from './symbol/symbol-list-drawer/symbol-list-drawer.component';
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDrawerModule} from "ng-zorro-antd/drawer";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SymbolListComponent,
    SymbolProfitComponent,
    UserProfitComponent,
    GroupProfitComponent,
    SymbolAddComponent,
    LoginComponent,
    UserProfitDetailComponent,
    MenuComponent,
    SymbolProfitDetailComponent,
    GroupProfitDetailComponent,
    SymbolListDrawerComponent,
  ],
    imports: [
        DashboardModule,
        SettingModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NzLayoutModule,
        NzDropDownModule,
        BrowserAnimationsModule,
        NzTableModule,
        NzDividerModule,
        NzFormModule,
        NzMenuModule,
        NzButtonModule,
        ReactiveFormsModule,
        NzInputModule,
        NzModalModule,
        FormsModule,
        NzAutocompleteModule,
        NzInputNumberModule,
        NzDatePickerModule,
        NzSelectModule,
        NzMessageModule,
        NzIconModule,
        NzGridModule,
        NzRadioModule,
        NzDrawerModule
    ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
  bootstrap: [AppComponent]
})
export class AppModule { }
