import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {AppService} from "../../app.service";
import {ObserverService} from "../../../service/local/observer.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  account;
  password;
  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private msgService: NzMessageService,
              private appService: AppService,
              private observerService: ObserverService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      account:  ['', Validators.compose([ Validators.required ])],
      password: ['', Validators.compose([ Validators.required ])  ],
    });
  }

  /**
   * 登录
   */
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if ( this.validateForm.status !== 'VALID') {
      return;
    }
    // todo 调用登录接口
    this.observerService.getLoginObserver().next(true);


  }
}
