import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddPAtientDialogData} from '../ClientsList/ClientsList.component';
import {NotificationService} from '../../NotifService/notification.service';
import {BASEURL} from '../../BaseUrl';
import {NgForm} from '@angular/forms';
import {DateAdapter} from '@angular/material/core';
export class VisitToAdd {
  ID = null;
  Consultation = null;
  MedsList = null;
  ToDoNext = null;
  VisitDateDay = null;
  VisitDateMonth = null;
  VisitDateYear = null;
  VisitTime = null;
  IDPat = null;
  IDDoct = null;
}
@Component({
  selector: 'app-add-visit-dialog',
  templateUrl: './add-visit-dialog.component.html',
  styleUrls: ['./add-visit-dialog.component.css']
})
export class AddVisitDialogComponent implements OnInit {
  visitToAdd = new VisitToAdd();
  VisitDate = null;
  Hour = null;
  Minute = null;
  urlAddVisit = BASEURL + 'Patients/AddVisit';
  constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: AddPAtientDialogData,
              private notif: NotificationService, public dialogRef: MatDialogRef<AddVisitDialogComponent>, private _adapter: DateAdapter<any>) { }
  ngOnInit(): void {
    this._adapter.setLocale('fr');
  }
  AddVisit(f: NgForm) {
  this.visitToAdd.IDDoct = sessionStorage.getItem('iddoct');
  this.visitToAdd.IDPat = this.data.PatID;
  this.visitToAdd.VisitTime = this.Hour + ':' + this.Minute;
  this.visitToAdd.VisitDateDay = this.DateParser(this.VisitDate).substr(0, 2);
  this.visitToAdd.VisitDateMonth = this.DateParser(this.VisitDate).substr(3, 2);
  this.visitToAdd.VisitDateYear = this.DateParser(this.VisitDate).substr(6, 4);
  this.http.post(this.urlAddVisit, this.visitToAdd).toPromise().then(data => {
    this.notif.showNotification('success', 'Une nouvelle visite a été ajoutée', 'add');
    this.dialogRef.close();
  }).catch(data => {
    this.notif.showNotification('danger', 'Veuillez reéssayer ultérieurement', 'error');
  });
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
