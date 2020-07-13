import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {ClientsListComponent} from './Cytizen/ClientsList/ClientsList.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthGuard} from './login/auth.guard';
import {PatientsComponent} from './Cytizen/patients/patients.component';
import {ClientDetailsComponent} from './Cytizen/client-details/client-details.component';
import {ListeRdvComponent} from './liste-rdv/liste-rdv.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ManageNursesComponent} from './Cytizen/manage-nurses/manage-nurses.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'Dashboard',
        pathMatch: 'full'
      },
      {
        path: 'ListeVisites',
        component: PatientsComponent,
        children: [
          {
            path: '',
            component: ClientsListComponent,
          },
          {
            path: 'PatientDetails/:id',
            component: ClientDetailsComponent,
          }
        ]
      },
      {
        path: 'ListRdv',
        component: ListeRdvComponent,
      },
      {
        path: 'Dashboard',
        component: DashboardComponent,
      },
      {
        path: 'ManageNurses',
        component: ManageNursesComponent,
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'SignUp',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
