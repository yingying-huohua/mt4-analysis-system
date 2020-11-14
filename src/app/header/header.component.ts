import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ObserverService} from "../../service/local/observer.service";
import {AppService} from "../app.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() headerMenu;
  @Output() tabClick: EventEmitter<string> = new EventEmitter<string>();
  @Input() selectedId;

  title;
  showTitle = false;
  eventSubscription;
  constructor(private router: Router,
              private observerService: ObserverService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.initObserver();
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  initObserver() {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('dashboard/symbol')) {
          this.showTitle = true;
          this.title = this.appService.currentSymbol;
          return;
        }
        this.showTitle = false;
      }
    })
  }

  selectTab(id) {
    this.tabClick.emit(id);
  }

  loginOut() {
    this.observerService.getLoginObserver().next(false);
  }
}
