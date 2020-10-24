import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {SymbolOperationType, SymbolOpreationModalTitle} from '../../../constant/SymbolOperationType';

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
  modalTitle;
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private nzModalRef: NzModalRef) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [this.name ? this.name : null, [Validators.required]],
      symbol: [this.symbol ? this.symbol : null, [Validators.required]],
      standardSymbol: [this.standardSymbol ? this.standardSymbol : null, [Validators.required]],
    });
    this.initModalTitle();
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
      id: this.item ? this.item.id : '10000',
      name: this.name,
      symbol: this.symbol,
      standardSymbol: this.standardSymbol
    }
    this.nzModalRef.close(object);
  }

}
