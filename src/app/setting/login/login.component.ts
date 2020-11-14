import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {AppService} from "../../app.service";
import {ObserverService} from "../../../service/local/observer.service";
import {HttpService} from "../../../service/http/http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  account = 'admin';
  password = '123123';
  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private msgService: NzMessageService,
              private appService: AppService,
              private observerService: ObserverService,
              private httpService: HttpService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      account:  [this.account, Validators.compose([ Validators.required ])],
      password: [this.password, Validators.compose([ Validators.required ])  ],
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

    const observer = {
      next: response => {
        if (response.code == 1) {
          this.observerService.getLoginObserver().next(true);
          return;
        }
        this.msgService.error(response.msg);

      }
    }
    this.httpService.login(this.account, this.password).subscribe(observer);
  }
}
