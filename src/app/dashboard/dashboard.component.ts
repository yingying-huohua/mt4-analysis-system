import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http/http.service";
import {SymbolMeta} from "../../entity/SymbolMeta";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  meta: SymbolMeta;
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getMetaData();
  }

  getMetaData() {
    const observable = {
      next: response => {
        if (!response) {
          return;
        }
        this.meta = response;
      }
    }

    this.httpService.symoblDashboardMeta('AUDCHF').subscribe(observable);
  }
}
