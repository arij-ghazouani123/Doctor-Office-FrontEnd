import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notif-bar',
  templateUrl: './notif-bar.component.html',
  styleUrls: ['./notif-bar.component.css']
})
export class NotifBarComponent implements OnInit {
  @Input() OpenNotifBar = false;
  constructor() { }

  ngOnInit(): void {
  }

}
