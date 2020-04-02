import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AdvertisementComponent} from './pages/advertisement/advertisement.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {AdminComponent} from './pages/admin/admin.component';
import {AuthGuard} from './_helpers/auth.guard';
import {Role} from './models/role/role';


const routes: Routes = [

  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'advert/:id',
    component: AdvertisementComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
