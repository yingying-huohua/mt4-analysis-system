import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ObserverService} from "../../service/local/observer.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() headerMenu;
  @Output() tabClick: EventEmitter<string> = new EventEmitter<string>();
  @Input() selectedId;

  constructor(private router: Router,
              private observerService: ObserverService) { }

  ngOnInit(): void {
  }

  selectTab(id) {
    this.tabClick.emit(id);
  }

  loginOut() {
    this.observerService.getLoginObserver().next(false);
  }
}
