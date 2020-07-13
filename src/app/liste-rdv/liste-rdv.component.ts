import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '../NotifService/notification.service';
import {EditPatientDialogComponent} from '../Cytizen/edit-patient-dialog/edit-patient-dialog.component';
import {AddRdvDialogComponent, RdvToAdd} from './add-rdv-dialog/add-rdv-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {BASEURL} from '../BaseUrl';
import {AddPatientDialogComponent, PatientToAdd} from '../Cytizen/add-patient-dialog/add-patient-dialog.component';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-liste-rdv',
  templateUrl: './liste-rdv.component.html',
  styleUrls: ['./liste-rdv.component.css']
})
export class ListeRdvComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private notif: NotificationService) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource;
  LoadingList = false;
  Search = null;
  displayedColumns: string[] = ['Num', 'Name', 'DateVisit', 'Tel', 'LastVisit', 'NbrVisit', 'button'];
  // URLS
  urlGetRdvs = BASEURL + 'Patients/LoadRdvsByDoct?ID=';
  urlDelRdv = BASEURL + 'Patients/DelRdv?ID=';
  ngOnInit(): void {
    this.Init();
  }
  Init() {
    this.LoadingList = true;
    this.http.get<RdvToAdd[]>(this.urlGetRdvs + sessionStorage.getItem('iddoct')).toPromise().then(data => {
      this.dataSource = new MatTableDataSource<RdvToAdd>(data);
      this.paginator._intl.nextPageLabel = '';
      this.paginator._intl.previousPageLabel = '';
      this.paginator._intl.lastPageLabel = '';
      this.paginator._intl.firstPageLabel = '';
      this.dataSource.paginator = this.paginator;
      this.LoadingList = false;
    });
  }
  DelRdv(ID) {
    this.http.delete(this.urlDelRdv + ID).toPromise().then(data => {
      this.Init();
      this.notif.showNotification('warning', 'Rendez-vous a été supprimé', 'delete');
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  DelSearch() {
    this.Search = '';
    this.applyFilter(this.Search);
  }
  AddRdv() {
    const dialogRef = this.dialog.open(AddRdvDialogComponent, {
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.Init();
    });
  }
}
