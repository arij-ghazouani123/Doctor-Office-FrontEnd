import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AddPatientDialogComponent, Allergy, PatientToAdd} from '../add-patient-dialog/add-patient-dialog.component';
import {BASEURL} from '../../BaseUrl';
import {MatDialog} from '@angular/material/dialog';
import {AddVisitDialogComponent, VisitToAdd} from '../add-visit-dialog/add-visit-dialog.component';
import {EditPatientDialogComponent} from '../edit-patient-dialog/edit-patient-dialog.component';
import {NotificationService} from '../../NotifService/notification.service';
import {EditVisitDialogComponent} from '../edit-visit-dialog/edit-visit-dialog.component';
export class PatientDetails {
  PatDetails: PatientToAdd;
  Allergies: Allergy[];
  Maladies: Allergy[];
}
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  // URLS
  urlGetPatient = BASEURL + 'Patients/LoadPatientById?ID=';
  urlDelVisit = BASEURL + 'Patients/DelVisit?ID=';
  urlDelPat = BASEURL + 'Patients/DelPatient?ID=';
  urlGetVisits = BASEURL + 'Patients/LoadVisitsByPat?ID=';
  urlLoadMaladies = BASEURL + 'Patients/LoadMaladiesByPat?ID=';
  urlLoadAllergies = BASEURL + 'Patients/LoadAllergiesByPat?ID=';
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private notif: NotificationService) { }
  PatID = null;
  allergies: Allergy[];
  Illness: Allergy[];
  Visits: VisitToAdd[];
  Patient = new PatientDetails();
  ngOnInit(): void {
    this.PatID = this.route.snapshot.paramMap.get('id');
    this.Init();
  }
  DelVisit(ID) {
    this.http.delete(this.urlDelVisit + ID + '&PatID=' + this.PatID).toPromise().then(data => {
      this.notif.showNotification('warning', 'Une visite a été supprimée', 'delete');
      this.Init();
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
  Init() {
    this.LoadAllergies();
    this.LoadMaladies();
    this.http.get<PatientDetails>(this.urlGetPatient + this.PatID).toPromise().then(data => {
      this.Patient = data;
      console.log(this.Patient);
    });
    this.http.get<VisitToAdd[]>(this.urlGetVisits + this.PatID).toPromise().then(data => {
      this.Visits = data;
      this.Visits.sort((left, right) => {
        if  (left.ID > right.ID){
          return -1;
        }
        if (left.ID < right.ID)
        {
          return 1;
        }
        return 0;
      });
      console.log(this.Visits);
    });
  }
  EditPat() {
    const dialogRef = this.dialog.open(EditPatientDialogComponent, {
      width: '60%',
      data: {
        PatID: this.PatID,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.Init();
    });
  }
  DelPat() {
    this.http.delete(this.urlDelPat + this.PatID).toPromise().then(data => {
      this.notif.showNotification('danger', 'Le patient a été suprimé', 'delete');
      this.router.navigate(['/ListeVisites']);
    });
  }
  EditVisit(ID) {
    const dialogRef = this.dialog.open(EditVisitDialogComponent, {
      width: '60%',
      data: {
        PatID: this.PatID,
        VisitID: ID,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.Init();
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddVisitDialogComponent, {
      width: '60%',
      data: {
        PatID: this.PatID,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.Init();
    });
  }

}
