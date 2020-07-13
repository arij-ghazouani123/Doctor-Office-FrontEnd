import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddPAtientDialogData} from '../ClientsList/ClientsList.component';
import {NotificationService} from '../../NotifService/notification.service';
import {DateAdapter} from '@angular/material/core';
import {Allergy, PatientToAdd} from '../add-patient-dialog/add-patient-dialog.component';
import {BASEURL} from '../../BaseUrl';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-patient-dialog',
  templateUrl: './edit-patient-dialog.component.html',
  styleUrls: ['./edit-patient-dialog.component.css']
})
export class EditPatientDialogComponent implements OnInit {
  allergies = new Array<Allergy>();
  Illness = new Array<Allergy>();
  AlgyName = null;
  IllnessName = null;
  PatID = this.data.PatID;
  BirthDate = null;
  patientToAdd =  new PatientToAdd();
  urlAddAllergy = BASEURL + 'Patients/AddSingleAllergy';
  urlAddIllness = BASEURL + 'Patients/AddSingleIllness';
  urlLoadMaladies = BASEURL + 'Patients/LoadMaladiesByPat?ID=';
  urlLoadPatDetails = BASEURL + 'Patients/LoadPatDetails?ID=';
  urlLoadAllergies = BASEURL + 'Patients/LoadAllergiesByPat?ID=';
  urlDelAllergy = BASEURL + 'Patients/DelAllergy?ID=';
  urlDelIll = BASEURL + 'Patients/DelIll?ID=';
  urlEditPat = BASEURL + 'Patients/EditPat';
  constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: AddPAtientDialogData,
              private notif: NotificationService, public dialogRef: MatDialogRef<EditPatientDialogComponent>, private Adapter: DateAdapter<any>) { }
  ngOnInit(): void {
    this.Adapter.setLocale('fr');
    this.LoadAllergies();
    this.LoadMaladies();
    this.LoadPatDetails();
  }
  AddAllergyToDB() {
    const alg = new Allergy();
    alg.Name = this.AlgyName;
    alg.PatID = this.PatID;
    this.http.post(this.urlAddAllergy, alg).toPromise().then(data => {
      console.log(data);
      this.AlgyName = null;
      this.LoadAllergies();
    });
  }
  AddIllnessToDB() {
    const Illness = new Allergy();
    Illness.Name = this.IllnessName;
    Illness.PatID = this.PatID;
    this.http.post(this.urlAddIllness, Illness).toPromise().then(data => {
      console.log(data);
      this.IllnessName = null;
      this.LoadMaladies();
    });
  }
  LoadAllergies() {
    this.http.get<Allergy[]>(this.urlLoadAllergies + this.PatID).toPromise().then(data => {
      this.allergies = data;
      console.log(this.allergies);
    });
  }
  LoadMaladies() {
    this.http.get<Allergy[]>(this.urlLoadMaladies + this.PatID).toPromise().then(data => {
      this.Illness = data;
      console.log(this.Illness);
    });
  }
  LoadPatDetails() {
    this.http.get<PatientToAdd>(this.urlLoadPatDetails + this.PatID).toPromise().then(data => {
      this.patientToAdd = data;
      this.patientToAdd.Gender = this.patientToAdd.Gender.toString().substr(0, 5);
      console.log(this.patientToAdd);
      console.log(data);
    });
  }
  EditPat(f: NgForm) {
    this.patientToAdd.NbreVisits = 0;
    this.patientToAdd.IDDoct = sessionStorage.getItem('iddoct');
    this.http.put(this.urlEditPat, this.patientToAdd).toPromise().then(data => {
      // this.PatID = data;
      console.log(data);
      this.notif.showNotification('success', 'Patient modifié avec succès', 'done');
      this.dialogRef.close();
      console.log(data);
    }).catch(data => {
      // SHOW NOTIF
    });
  }
  DelAllergy(ID) {
    this.http.delete(this.urlDelAllergy + ID).toPromise().then(data => {
      this.LoadAllergies();
    });
  }
  DelIll(ID) {
    this.http.delete(this.urlDelIll + ID).toPromise().then(data => {
      this.LoadMaladies();
    });
  }
  DateParser(date) {
    if (date !== null) {
      date = date.toLocaleDateString('fr');
    } else {
      date = null;
    }
    console.log('PARSEDD DATE' + date);
    return date;
  }
}
