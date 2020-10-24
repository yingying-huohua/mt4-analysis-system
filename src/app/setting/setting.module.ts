import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImportDataComponent} from './import-data/import-data.component';
import {SystemConfigComponent} from './system-config/system-config.component';
import {SettingRoutingModule} from './setting-routing.module';



@NgModule({
  declarations: [
    ImportDataComponent,
    SystemConfigComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
