import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http/http.service';
import {SymbolMeta} from '../../entity/SymbolMeta';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '../app.service';
import {ModalService} from "../../service/local/modal.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  meta: SymbolMeta;
  symbol = 'AUDCHF';

  constructor(private httpService: HttpService,
              private route: ActivatedRoute,
              private appService: AppService,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: {id: string}) => {
      if (params.id) {
        this.symbol = params.id;
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
      }
    }

    this.httpService.symoblDashboardMeta(this.symbol).subscribe(observable);
  }

  /**
   * 检查当前看板是否为综合看板
   */
  isIntegrativeDashboard() {
    return this.appService.isIntegrativeDashboard(this.symbol);
  }

  /**
   * 打开品种列表抽屉
   */
  openSymbolListDrawer() {
    this.modalService.showSymbolListDrawer();
  }
}
