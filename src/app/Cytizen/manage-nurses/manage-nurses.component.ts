import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../NotifService/notification.service';
import {BASEURL} from '../../BaseUrl';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
export class Nurse {

}
@Component({
  selector: 'app-manage-nurses',
  templateUrl: './manage-nurses.component.html',
  styleUrls: ['./manage-nurses.component.css']
})
export class ManageNursesComponent implements OnInit {
  ID = null;
  urlAddNurse = BASEURL + 'Users/InviteNurse?IDNr=';
  urlMyNurses = BASEURL + 'Users/LoadMyNurses?IDDoct=';
  urlDelNurse = BASEURL + 'Users/RemoveNurse';
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private notif: NotificationService) { }
  dataSource;
  LoadingList = false;
  Search = null;
  displayedColumns: string[] = ['Num', 'Name', 'Tel', 'BirthDate', 'JoinDate', 'button'];
  ngOnInit(): void {
    this.LoadMyNurses();
  }
  LoadMyNurses(){
    this.LoadingList = true;
    this.http.get<Nurse[]>(this.urlMyNurses + sessionStorage.getItem('iddoct')).toPromise().then(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource<Nurse>(data);
      this.LoadingList = false;
    });
  }
  RemoveNurse(ID) {
    this.http.put(this.urlDelNurse, ID).toPromise().then(data => {
      this.notif.showNotification('warning', 'Un(e) infermier(e) a été supprimé', 'delete');
      this.LoadMyNurses();
    });
  }
  AddNurse(f: NgForm){
    const joindate = new Date().toLocaleDateString('fr');
    this.http.get(this.urlAddNurse + this.ID + '&IDDr=' + sessionStorage.getItem('iddoct') +  '&JoinDate=' + joindate).toPromise().then(data => {
      console.log(data);
      if (data === true) {
        this.notif.showNotification('success', 'Infermier ajouter avec succès', 'done');
        this.LoadMyNurses();
      } else {
        this.notif.showNotification('warning', 'Infermier indisponible', 'search_off');
      }
      f.resetForm();
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
