import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASEURL} from '../BaseUrl';
import {NotificationService} from '../NotifService/notification.service';
import {Router} from '@angular/router';
export class UserToAdd {
  ID = null;
  FirstName = null;
  LastName = null;
  Email = null;
  Tel = null;
  Password = null;
  Type = null;
  BirthDate = null;
  Gender = null;
  IDDoct = null;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  VerifPwd = null;
  userToAdd = new UserToAdd();
  BDate = null;
  urlAddDoct = BASEURL + 'Users/DoctorSingUp';
  urlAddNurse = BASEURL + 'Users/NurseSingUp';
  constructor(private http: HttpClient, private notif: NotificationService, private router: Router) { }

  ngOnInit(): void {
  }
  AddUser() {
    if (this.userToAdd.Password === this.VerifPwd) {
      this.userToAdd.BirthDate = this.DateParser(this.BDate);
      if (this.userToAdd.Type === 'Doctor')
      {
        this.http.post(this.urlAddDoct, this.userToAdd).toPromise().then(data => {
          if (data === null)
          {
            this.notif.showNotification('success', 'Votre compte a été créer avec succès Dr. ' + this.userToAdd.LastName + ' ' + this.userToAdd.FirstName, 'how_to_reg');
            this.router.navigate(['/login']);
          } else if (data === 'UserExists')
          {
            this.notif.showNotification('danger', 'Cette adresse mail est déja utilisée', 'error');
          }
        });
      } else
      {
        this.http.post(this.urlAddNurse, this.userToAdd).toPromise().then(data => {
          if (data === null)
          {
            this.notif.showNotification('success', 'Votre compte a été créer avec succès', 'how_to_reg');
            this.router.navigate(['/login']);
          } else if (data === 'UserExists')
          {
            this.notif.showNotification('danger', 'Cette adresse mail est déja utilisée', 'error');
          }
        });
      }
    } else {
      this.notif.showNotification('warning', 'Veuillez vérifier votre mot de passe', 'lock');
    }
  }
  DateParser(date) {
    if (date !== null) {
      date = date.toLocaleDateString('fr');
    } else {
      date = null;
    }
    return date;
  }
}
