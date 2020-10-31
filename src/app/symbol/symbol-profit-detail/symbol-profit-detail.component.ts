import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-symbol-profit-detail',
  templateUrl: './symbol-profit-detail.component.html',
  styleUrls: ['./symbol-profit-detail.component.css']
})
export class SymbolProfitDetailComponent implements OnInit {
  sumbolDetailList = [];
  isLoading = false
  constructor() { }

  ngOnInit(): void {
  }

}
