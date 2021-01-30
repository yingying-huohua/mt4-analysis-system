import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../BaseComponent";
import {FutureSwitchType} from "../../../constant/HeaderMenu";
import {AppService} from "../../app.service";
import {FuturesService} from "../../../service/http/futures.service";

@Component({
  selector: 'app-trade-behaviour',
  templateUrl: './trade-behaviour.component.html',
  styleUrls: ['./trade-behaviour.component.css']
})
export class TradeBehaviourComponent extends BaseComponent implements OnInit {
  FutureSwitchType = FutureSwitchType;
  radioValue = FutureSwitchType.position;
  constructor(private httpService: FuturesService,
              private appService: AppService) {
    super();
  }

  ngOnInit(): void {
  }

  moneyFormat(value) {
    return this.appService.moneyFormat(value.toString());
  }
}
