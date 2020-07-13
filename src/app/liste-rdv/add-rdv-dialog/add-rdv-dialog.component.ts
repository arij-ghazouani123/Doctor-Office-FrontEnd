import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddPAtientDialogData} from '../../Cytizen/ClientsList/ClientsList.component';
import {NotificationService} from '../../NotifService/notification.service';
import {DateAdapter} from '@angular/material/core';
import {PatientToAdd} from '../../Cytizen/add-patient-dialog/add-patient-dialog.component';
import {BASEURL} from '../../BaseUrl';
export class RdvToAdd {
  ID = null;
  PatID = null;
  FirstName = null;
  LastName = null;
  VisitTime = null;
  VisitDateDay = null;
  VisitDateMonth = null;
  VisitDateYear = null;
  IDDoct = null;
  Tel = null;
  LastVisit = null;
  NewPat = null;
  NbreVisits = null;
}
@Component({
  selector: 'app-add-rdv-dialog',
  templateUrl: './add-rdv-dialog.component.html',
  styleUrls: ['./add-rdv-dialog.component.css']
})
export class AddRdvDialogComponent implements OnInit {
  // URLS
  urlAddRdv = BASEURL + 'Patients/AddRDV';
  urlLoadPatients = BASEURL + 'Patients/LoadPatients?ID=';

  AddNew = false;
  RdvDate = null;
  Hour = null;
  Minute = null;
  FirstName = null;
  LastName = null;
  Phone = null;
  patient = new PatientToAdd();
  patients: PatientToAdd[];
  rdvToAdd = new RdvToAdd();
  constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: AddPAtientDialogData,
              private notif: NotificationService, public dialogRef: MatDialogRef<AddRdvDialogComponent>, private _adapter: DateAdapter<any>)
  {}

  ngOnInit(): void {
    this._adapter.setLocale('fr');
    this.http.get<PatientToAdd[]>(this.urlLoadPatients + sessionStorage.getItem('iddoct')).toPromise().then(data => {
      this.patients = data;
    });
  }
  AddRdv() {
    if (!this.AddNew) {
      this.rdvToAdd.FirstName = this.patient.FirstName;
      this.rdvToAdd.LastName = this.patient.LastName;
      this.rdvToAdd.PatID = this.patient.ID;
      this.rdvToAdd.Tel = this.patient.PhoneNumber;
      this.rdvToAdd.IDDoct = sessionStorage.getItem('iddoct');
    } else {
      this.rdvToAdd.FirstName = this.FirstName;
      this.rdvToAdd.LastName = this.LastName;
      this.rdvToAdd.Tel = this.Phone;
      this.rdvToAdd.IDDoct = sessionStorage.getItem('iddoct');
    }
    this.rdvToAdd.VisitTime = this.Hour + ':' + this.Minute;
    this.rdvToAdd.VisitDateDay = this.DateParser(this.RdvDate).substr(0, 2);
    this.rdvToAdd.VisitDateMonth = this.DateParser(this.RdvDate).substr(3, 2);
    this.rdvToAdd.VisitDateYear = this.DateParser(this.RdvDate).substr(6, 4);
    this.http.post(this.urlAddRdv, this.rdvToAdd).toPromise().then(data => {
      console.log(data);
      if (data === true)
      {
        this.notif.showNotification('success', 'Rendez-vous a été ajouté avec succès', 'done');
        this.dialogRef.close();
      } else {
        this.notif.showNotification('warning', 'Veuillez choisir une autre date', 'error');
      }
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
