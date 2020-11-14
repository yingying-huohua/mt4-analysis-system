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
  symbol = '';

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
        this.symbol = params.id;
      } else {
        this.symbol = '';
      }

      //FIXME url参数配置完成后，删除默认值
      if(!this.isIntegrativeDashboard()) {
        this.symbol = 'AUDCHF';
      }

      console.debug(`this.category:${this.category}, this.symbol:${this.symbol}`);
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
    if(this.category === HeaderMenu.futures) {
      this.httpService.futuresIndexDashboardMeta(this.symbol).subscribe(observable);
      return;
    }
    if(this.category === HeaderMenu.foreign_exchange) {
      this.httpService.forexIndexDashboardMeta(this.symbol).subscribe(observable);
      return;
    }
    // 默认为单品种
    this.httpService.symoblDashboardMeta(this.symbol).subscribe(observable);
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
