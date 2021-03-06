import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObserverService {
  private loginObserver: BehaviorSubject<boolean>;
  private logoutObserver: BehaviorSubject<boolean>;
  constructor() {
    this.init();
  }

  init() {
    this.loginObserver = new BehaviorSubject<boolean>(false);
    this.logoutObserver = new BehaviorSubject<boolean>(false);
  }

  getLoginObserver() {
    return this.loginObserver;
  }

  getLoginoutObserver() {
    return this.logoutObserver;
  }
}
