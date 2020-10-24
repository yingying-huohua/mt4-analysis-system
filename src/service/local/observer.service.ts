import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObserverService {
  private symbolAddObserver: BehaviorSubject<object>;
  private symbolUpdateObserver: BehaviorSubject<object>;
  constructor() { }

  init() {
    this.symbolAddObserver = new BehaviorSubject(null);
    this.symbolUpdateObserver = new BehaviorSubject(null);
  }

  getSymbolAddObserver() {
    return this.symbolAddObserver;
  }

  getSymbolUpdateObserver() {
    return this.symbolUpdateObserver;
  }
}
