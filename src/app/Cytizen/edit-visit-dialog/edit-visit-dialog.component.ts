import {Component, Inject, OnInit} from '@angular/core';
import {VisitToAdd} from '../add-visit-dialog/add-visit-dialog.component';
import {BASEURL} from '../../BaseUrl';
import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddPAtientDialogData} from '../ClientsList/ClientsList.component';
import {NotificationService} from '../../NotifService/notification.service';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-edit-visit-dialog',
  templateUrl: './edit-visit-dialog.component.html',
  styleUrls: ['./edit-visit-dialog.component.css']
})
export class EditVisitDialogComponent implements OnInit {
  visitToAdd = new VisitToAdd();
  VisitDate = null;
  Hour = null;
  Minute = null;
  urlEditVisit = BASEURL + 'Patients/EditVisit';
  urlLoadVisitByID = BASEURL + 'Patients/LoadVisitByID?ID=';
  constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: AddPAtientDialogData,
              private notif: NotificationService, public dialogRef: MatDialogRef<EditVisitDialogComponent>, private _adapter: DateAdapter<any>) { }
  ngOnInit(): void {
    this._adapter.setLocale('fr');
    this.LoadVisitDetails();
  }
  LoadVisitDetails(){
    this.http.get<VisitToAdd>(this.urlLoadVisitByID + this.data.VisitID).toPromise().then(data => {
      this.visitToAdd = data;
      this.VisitDate = new Date(this.visitToAdd.VisitDateYear, +this.visitToAdd.VisitDateMonth, +this.visitToAdd.VisitDateDay);
      this.Minute = this.visitToAdd.VisitTime.toString().substring(3, 2);
      this.Hour = this.visitToAdd.VisitTime.toString().substr(0, 2);
    });
  }
  EditVisit(){
    this.visitToAdd.IDDoct = sessionStorage.getItem('iddoct');
    this.visitToAdd.IDPat = this.data.PatID;
    this.visitToAdd.ID = this.data.VisitID;
    if (this.Minute.toString().length === 1) {
      this.Minute = '0' + this.Minute;
    }
    if (this.Hour.toString().length === 1) {
      this.Hour = '0' + this.Hour;
    }
    this.visitToAdd.VisitTime = this.Hour + ':' + this.Minute;
    this.visitToAdd.VisitDateDay = this.DateParser(this.VisitDate).substr(0, 2);
    this.visitToAdd.VisitDateMonth = this.DateParser(this.VisitDate).substr(3, 2);
    this.visitToAdd.VisitDateYear = this.DateParser(this.VisitDate).substr(6, 4);
    this.http.put(this.urlEditVisit, this.visitToAdd).toPromise().then(data => {
      this.notif.showNotification('success', 'Une visite a été modifée', 'done');
      this.dialogRef.close();
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
