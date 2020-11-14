import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http/http.service';
import {SymbolMeta} from '../../entity/SymbolMeta';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '../app.service';
import {ModalService} from '../../service/local/modal.service';
import {HeaderMenu} from 'src/constant/HeaderMenu';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  meta: SymbolMeta;
  category: string;
  standardSymbol = '';

  constructor(private httpService: HttpService,
              private route: ActivatedRoute,
              private appService: AppService,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: {category: string, id: string}) => {
      if(params.category) {
        this.category = params.category;
      }
      if (params.id) {
        this.standardSymbol = params.id;
      } else {
        this.standardSymbol = this.appService.currentSymbol;
      }

      console.debug(`this.category:${this.category}, this.standardSymbol:${this.standardSymbol}`);
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
      },
      error: any => {
        this.meta = undefined;
      }
    }
    if(this.category === HeaderMenu.futures) {
      this.httpService.futuresIndexDashboardMeta(this.standardSymbol).subscribe(observable);
      return;
    }
    if(this.category === HeaderMenu.foreign_exchange) {
      this.httpService.forexIndexDashboardMeta(this.standardSymbol).subscribe(observable);
      return;
    }
    // 默认为单品种
    this.httpService.symoblDashboardMeta(this.standardSymbol).subscribe(observable);
  }

  /**
   * 检查当前看板是否为综合看板
   */
  isIntegrativeDashboard() {
    return this.appService.isIntegrativeDashboard(this.category);
  }

  /**
   * 打开品种列表抽屉
   */
  openSymbolListDrawer() {
    this.modalService.showSymbolListDrawer();
  }
}
