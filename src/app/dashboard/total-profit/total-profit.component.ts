import {Component, Input, OnInit} from '@angular/core';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-total-profit',
  templateUrl: './total-profit.component.html',
  styleUrls: ['./total-profit.component.css']
})
export class TotalProfitComponent implements OnInit {
  @Input() totalMoney;
  constructor(private appService: AppService) { }

  ngOnInit(): void { }

  formatNum(value) {
    return this.appService.moneyFormatWithUnit(value);
  }

}
