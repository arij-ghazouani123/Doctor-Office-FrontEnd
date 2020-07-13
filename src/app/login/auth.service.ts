import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BASEURL} from '../BaseUrl';
import {UserToAdd} from '../sign-up/sign-up.component';
import {NotificationService} from '../NotifService/notification.service';
import {AddPatientDialogComponent} from '../Cytizen/add-patient-dialog/add-patient-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ShowIDComponent} from './show-id/show-id.component';

@Injectable({
  providedIn: 'root'
})
export class UserInfo{
 user = new UserToAdd();
 Type = null;
 UserExist = null;
}
export class AuthService {
  urlLogin = BASEURL + 'Users/Login?login=';
user = new UserInfo();
  constructor(private http: HttpClient, private router: Router, private notif: NotificationService, public dialog: MatDialog) { }
  LogIn(login, pwd) {
    this.http.get<UserInfo>(this.urlLogin + login + '&pwd=' + pwd).toPromise().then(data => {
      this.user = data;
      console.log(data);
      if (this.user.UserExist === 'NotFound') {
        this.notif.showNotification('warning', 'Cet utilisateur n\'existe pas', 'person_search');
        // SHOW NOTIF
      } else if (this.user.UserExist === 'FoundNoDoct') {
        sessionStorage.setItem('iddoct', this.user.user.ID);
        this.openDialog();
        this.notif.showNotification('warning', 'Vous n\'appartenez à aucun docteur', 'info');
      } else if (this.user.UserExist === 'Found') {
          sessionStorage.setItem('userid', this.user.user.ID);
          sessionStorage.setItem('usertype', this.user.Type);
          sessionStorage.setItem('firstname', this.user.user.FirstName);
          sessionStorage.setItem('lastname', this.user.user.LastName);
          if(this.user.Type === 'Doctor')
          {
            sessionStorage.setItem('iddoct', this.user.user.ID);
          } else {
            sessionStorage.setItem('iddoct', this.user.user.IDDoct);
          }
          this.router.navigate(['/']);
      }else if (this.user.UserExist === 'WrongPwd') {
        this.notif.showNotification('warning', 'Veuillez vérifier votre mot de passe', 'lock');
      }
    }).catch(data => {
      console.log(data);
      this.notif.showNotification('danger', 'Veuillez reessayer ultérieurement', 'restore');
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(ShowIDComponent, {
      width: '40%',
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
