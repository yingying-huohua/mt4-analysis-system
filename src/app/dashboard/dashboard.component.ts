import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../service/http/http.service';
import {SymbolMeta} from '../../entity/SymbolMeta';
import {ActivatedRoute} from '@angular/router';
import {HeaderMenu} from '../../constant/HeaderMenu';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  meta: SymbolMeta;
  id = 'AUDCHF';

  constructor(private httpService: HttpService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: {id: string}) => {
      console.debug(params.id);
      if (params.id) {
        this.id = params.id;
      }
      this.getMetaData();
    });
  }

  getMetaData() {
    const observable = {
      next: response => {
        if (!response) {
          return;
        }

        this.meta = response;
        console.debug('meta', this.meta);
      }
    }

    this.httpService.symoblDashboardMeta(this.id).subscribe(observable);
  }

  /**
   * 检查当前看板是否为综合看板
   */
  isIntegrativeDashboard() {
    let isIntegrative;
    switch (this.id) {
      case HeaderMenu.futures:
      case HeaderMenu.foreign_exchange:
        isIntegrative = true;
        break;
      default:
        isIntegrative = false;
        break;
    }
    return isIntegrative;
  }
}
