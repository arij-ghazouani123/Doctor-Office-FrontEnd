import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {FlexModule} from '@angular/flex-layout/typings/esm5/flex';
import { MainComponent } from './main/main.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import {MatIconModule} from '@angular/material/icon';
import { ClientsListComponent } from './Cytizen/ClientsList/ClientsList.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ClientDetailsComponent } from './Cytizen/client-details/client-details.component';
import { NotifBarComponent } from './notif-bar/notif-bar.component';
import { AddPatientDialogComponent } from './Cytizen/add-patient-dialog/add-patient-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PatientsComponent } from './Cytizen/patients/patients.component';
import {NotificationService} from './NotifService/notification.service';
import { AddVisitDialogComponent } from './Cytizen/add-visit-dialog/add-visit-dialog.component';
import { EditPatientDialogComponent } from './Cytizen/edit-patient-dialog/edit-patient-dialog.component';
import { EditVisitDialogComponent } from './Cytizen/edit-visit-dialog/edit-visit-dialog.component';
import { ListeRdvComponent } from './liste-rdv/liste-rdv.component';
import { AddRdvDialogComponent } from './liste-rdv/add-rdv-dialog/add-rdv-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthService} from './login/auth.service';
import {MatDividerModule} from '@angular/material/divider';
import { ManageNursesComponent } from './Cytizen/manage-nurses/manage-nurses.component';
import { ShowIDComponent } from './login/show-id/show-id.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SideBarComponent,
    ClientsListComponent,
    ClientDetailsComponent,
    NotifBarComponent,
    AddPatientDialogComponent,
    LoginComponent,
    SignUpComponent,
    PatientsComponent,
    AddVisitDialogComponent,
    EditPatientDialogComponent,
    EditVisitDialogComponent,
    ListeRdvComponent,
    AddRdvDialogComponent,
    DashboardComponent,
    ManageNursesComponent,
    ShowIDComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    FlexModule,
    MatIconModule,
    AppRoutingModule,
    FormsModule,
    MatPaginatorModule,
    MatProgressBarModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    HttpClientModule,
    MatDividerModule
  ],
  entryComponents: [AddPatientDialogComponent, AddVisitDialogComponent, EditPatientDialogComponent, EditVisitDialogComponent, AddRdvDialogComponent, ShowIDComponent],
  providers: [NotificationService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
