import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-total-user',
  templateUrl: './total-user.component.html',
  styleUrls: ['./total-user.component.css']
})
export class TotalUserComponent implements OnInit {
  @Input() totalUser;
  constructor() { }

  ngOnInit(): void {
  }

}
