import { Component } from '@angular/core';
import {registerLocaleData} from "@angular/common";
import zh from "@angular/common/locales/zh";
registerLocaleData(zh)
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'md4-analysis-system';
}
