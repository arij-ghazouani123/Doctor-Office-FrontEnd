import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {BASEURL} from '../../BaseUrl';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddPAtientDialogData} from '../ClientsList/ClientsList.component';
import {NotificationService} from '../../NotifService/notification.service';
import {DateAdapter} from '@angular/material/core';
export class PatientToAdd {
  ID = null;
  FirstName = null;
  LastName = null;
  PhoneNumber = null;
  Age = null;
  LastVisit = null;
  Gender = null;
  NbreVisits = null;
  CIN = null;
  Adress = null;
  IDDoct = null;
}
export class Allergy {
  ID = null;
  Name = null;
  PatID = null;
}
@Component({
  selector: 'app-add-patient-dialog',
  templateUrl: './add-patient-dialog.component.html',
  styleUrls: ['./add-patient-dialog.component.css']
})

export class AddPatientDialogComponent implements OnInit {
patinetToAdd = new PatientToAdd();
AlgyName = null;
  IllnessName = null;
PatID = null;
urlAddPatient = BASEURL + 'Patients/AddPatient';
urlAddAllergy = BASEURL + 'Patients/AddAllergy';
urlAddIllness = BASEURL + 'Patients/AddIllness';
allergies = new Array<Allergy>();
Illness = new Array<Allergy>();
constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: AddPAtientDialogData,
            private notif: NotificationService, public dialogRef: MatDialogRef<AddPatientDialogComponent>, private _adapter: DateAdapter<any>) { }

  ngOnInit(): void {
  this._adapter.setLocale('fr');
  }
  AddPatient(f: NgForm) {
    this.patinetToAdd.NbreVisits = 0;
    this.patinetToAdd.IDDoct = sessionStorage.getItem('iddoct');
    this.http.post(this.urlAddPatient, this.patinetToAdd).toPromise().then(data => {
      // this.PatID = data;
      console.log(data);
      this.AddAllergyToDB(data);
      this.AddIllnessToDB(data);
      this.notif.showNotification('success', 'Patient ajouté avec succès', 'done');
      this.dialogRef.close();
      console.log(data);
    }).catch(data => {
      // SHOW NOTIF
    });
  }
  AddAllergyToArray() {
    const allergy = new Allergy();
    allergy.Name = this.AlgyName;
    this.allergies.push(allergy);
    this.AlgyName = null;
  }
  AddIllnessToArray() {
    const allergy = new Allergy();
    allergy.Name = this.IllnessName;
    this.Illness.push(allergy);
    this.IllnessName = null;
  }
  AddAllergyToDB(ID) {
    this.allergies.forEach(alg => {
      alg.PatID = ID;
    });
    this.http.post(this.urlAddAllergy, this.allergies).toPromise().then(data => {
      console.log(data);
    });
  }
  AddIllnessToDB(ID) {
    this.Illness.forEach(alg => {
      alg.PatID = ID;
    });
    this.http.post(this.urlAddIllness, this.Illness).toPromise().then(data => {
      console.log(data);
    });
  }
  RemoveAlg(Name) {
    this.allergies = this.allergies.filter(alg => alg.Name !== Name);
  }
  RemoveIll(Name) {
    this.Illness = this.Illness.filter(alg => alg.Name !== Name);
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
