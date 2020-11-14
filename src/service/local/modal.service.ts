import {Injectable} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {SymbolAddComponent} from '../../app/setting/symbol-add/symbol-add.component';
import {UserProfitDetailComponent} from '../../app/user/user-profit-detail/user-profit-detail.component';
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {SymbolListDrawerComponent} from "../../app/symbol/symbol-list-drawer/symbol-list-drawer.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private nzModalService: NzModalService,
              private drawerService: NzDrawerService) { }

  showSymbolAddModal(operationType, symbol) {
    return this.nzModalService.create({
      nzContent: SymbolAddComponent,
      nzComponentParams: {
        item: symbol,
        name: symbol ? symbol.name : '',
        symbol: symbol ? symbol.symbol : '',
        standardSymbol: symbol ? symbol.standardSymbol : '',
        operationType: operationType
      },
      nzMask: true,
      nzClosable: true,
      nzMaskClosable: false,
      nzFooter: null,
      nzBodyStyle: {padding: '0px'},
    });

  }

  showUserProfitDetail(item) {
     this.nzModalService.create({
      nzContent: UserProfitDetailComponent,
       nzComponentParams: {
         accountId: item.accountId,
         userId: item.userId
       },
      nzMask: true,
      nzClosable: true,
      nzMaskClosable: false,
      nzFooter: null,
      nzStyle: {width: '800px'},
      nzBodyStyle: {padding: '0px'},
    });

  }

  showSymbolListDrawer() {
    const drawerRef = this.drawerService.create({
      nzContent: SymbolListDrawerComponent,
      // nzMask: true,
      nzClosable: false,
      // nzMaskClosable: false,
      // nzFooter: null,
      nzBodyStyle: {padding: '0px'},
    });
    //
    // drawerRef.afterOpen.subscribe(() => {
    //   console.log('Drawer(Template) open');
    // });
    //
    // drawerRef.afterClose.subscribe(() => {
    //   console.log('Drawer(Template) close');
    // });
  }
}
