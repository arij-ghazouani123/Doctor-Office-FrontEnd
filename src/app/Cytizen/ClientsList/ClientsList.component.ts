import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {AddPatientDialogComponent, PatientToAdd} from '../add-patient-dialog/add-patient-dialog.component';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {BASEURL} from '../../BaseUrl';
export interface AddPAtientDialogData {
  PatID;
  VisitID;
}
@Component({
  selector: 'app-visits-list',
  templateUrl: './ClientsList.component.html',
  styleUrls: ['./ClientsList.component.css']
})
export class ClientsListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource;
  LoadingList = false;
  Search = null;
  displayedColumns: string[] = ['Num', 'Name', 'Age', 'Gender', 'LastVisit', 'NbrVisit', 'Tel'];

  // URLS
  urlGetPatients = BASEURL + 'Patients/LoadPatients?ID=';
  constructor(public dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.Init();
  }
  Init() {
    this.LoadingList = true;
    this.http.get<PatientToAdd[]>(this.urlGetPatients + sessionStorage.getItem('iddoct')).toPromise().then(data => {
      this.dataSource = new MatTableDataSource<PatientToAdd>(data);
      this.paginator._intl.nextPageLabel = '';
      this.paginator._intl.previousPageLabel = '';
      this.paginator._intl.lastPageLabel = '';
      this.paginator._intl.firstPageLabel = '';
      this.dataSource.paginator = this.paginator;
      this.LoadingList = false;
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddPatientDialogComponent, {
      width: '60%',
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.Init();
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
}
