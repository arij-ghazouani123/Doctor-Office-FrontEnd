import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BASEURL} from '../BaseUrl';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  Open = true;
  OpenNotifBar = false;
  FirstName = null;
  LastName = null;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.FirstName = sessionStorage.getItem('firstname');
    this.LastName = sessionStorage.getItem('lastname');
  }
  ToggleSideNav() {
    this.Open = !this.Open;
    if (this.OpenNotifBar === true) {
      this.OpenNotifBar = false;
    }
  }
  ToggleNotif() {
    this.OpenNotifBar = !this.OpenNotifBar;
    if (this.Open === true) {
      this.Open = false;
    }
  }
  LogOut(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
