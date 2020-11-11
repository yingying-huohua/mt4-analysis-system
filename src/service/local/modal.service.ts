import {Injectable} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {SymbolAddComponent} from '../../app/setting/symbol-add/symbol-add.component';
import {UserProfitDetailComponent} from '../../app/user/user-profit-detail/user-profit-detail.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private nzModalService: NzModalService) { }

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

}
