import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {SymbolOperationType, SymbolOpreationModalTitle} from '../../../constant/SymbolOperationType';
import {HttpService} from "../../../service/http/http.service";

@Component({
  selector: 'app-symbol-add',
  templateUrl: './symbol-add.component.html',
  styleUrls: ['./symbol-add.component.css']
})
export class SymbolAddComponent implements OnInit {
  @Input() name: string;
  @Input() symbol: string;
  @Input() standardSymbol: string;
  @Input() item;
  @Input() operationType: string;
  type;
  api;
  description;
  modalTitle;
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private nzModalRef: NzModalRef,
              private httpService: HttpService) {}

  ngOnInit(): void {
    this.type = this.item ? this.item.type : null;
    this.initValidateForm();
    this.initModalTitle();
  }

  private initValidateForm() {
    this.validateForm = this.fb.group({
      name: [this.name ? this.name : null, [Validators.required]],
      symbol: [this.symbol ? this.symbol : null, [Validators.required]],
      standardSymbol: [this.standardSymbol ? this.standardSymbol : null, [Validators.required]],
      type: [this.type ? this.type : null, [Validators.required]],
      description: [this.description ? this.description : null],
      api: [this.api ? this.api : null]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  initModalTitle() {
    switch (this.operationType) {
      case SymbolOperationType.add:
        this.modalTitle = SymbolOpreationModalTitle.add
        break;
      case SymbolOperationType.update:
        this.modalTitle = SymbolOpreationModalTitle.update
        break;
    }
  }

  /**
   * 保存
   */
  save() {
    if (this.validateForm.status !== 'VALID') {
      return;
    }
    const object = {
      name: this.name,
      symbol: this.symbol,
      standard_symbol: this.standardSymbol,
      type: this.type,
      api: this.api,
      description: this.description
    }

    switch (this.operationType) {
      case SymbolOperationType.add:
       this.symbolAdd(object);
        break;
      case SymbolOperationType.update:
        this.symbolUpdate(object);
        break;
    }
  }

  /**
   * 品种增加
   * @param object
   */
  symbolAdd(object) {
    const observer = {
      next: response => {
        this.nzModalRef.close(object);
      },
      error: error => {
        this.nzModalRef.close(object);
      }
    };

    this.httpService.symbolAdd(object).subscribe(observer);
  }

  /**
   * 品种修改
   * @param object
   */
  symbolUpdate(object) {
    object['id'] = this.item.id
    const observer = {
      next: response => {
        this.nzModalRef.close(object);
      },
      error: error => {
        this.nzModalRef.close(object);
      }
    };

    this.httpService.symbolUpdate(object).subscribe(observer);
  }
}
