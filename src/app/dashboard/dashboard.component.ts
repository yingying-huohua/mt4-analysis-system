import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http/http.service";
import {SymbolMeta} from "../../entity/SymbolMeta";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  meta: SymbolMeta;
  constructor(private httpService: HttpService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: {id: string}) => {
      console.debug(params.id);
      let id = 'AUDCHF';
      if (params.id) {
        id = params.id;
      }
      this.getMetaData(id);
    });

  }

  getMetaData(id) {
    const observable = {
      next: response => {
        if (!response) {
          return;
        }
        this.meta = response;
      }
    }

    this.httpService.symoblDashboardMeta(id).subscribe(observable);
  }
}
