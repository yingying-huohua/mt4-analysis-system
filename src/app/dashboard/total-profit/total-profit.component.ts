import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-total-profit',
  templateUrl: './total-profit.component.html',
  styleUrls: ['./total-profit.component.css']
})
export class TotalProfitComponent implements OnInit {
  @Input() totalMoney;
  constructor() { }

  ngOnInit(): void {
  }

}
