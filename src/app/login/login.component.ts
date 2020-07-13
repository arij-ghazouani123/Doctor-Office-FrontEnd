import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {BASEURL} from '../BaseUrl';
import {now} from 'moment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient, private auth: AuthService) { }
  login = null;
  Pwd = null;
  ngOnInit(): void {
  }
  LoginAttempt()
  {
    this.auth.LogIn(this.login, this.Pwd);
  }
}
