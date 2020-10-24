import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //是否折叠
  isCollapsed = false;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  importData() {

  }

  systemConfig() {

  }

  gotoSymbol() {
    this.router.navigate(['./symbol']);
  }

  gotoUserProfit() {
    this.router.navigate(['./user/profit']);
  }

  gotoGroupProfit() {
    this.router.navigate(['./group/profit']);
  }

  showMenu(){
    this.router.navigate(['./menu']);
  }
}
