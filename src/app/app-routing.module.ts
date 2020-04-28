import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AdvertisementComponent} from './pages/advertisement/advertisement.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {AuthGuard} from './_helpers/auth.guard';
import {AdditemComponent} from './pages/additem/additem.component';
import {DashboardFilteredComponent} from './pages/dashboard-filtered/dashboard-filtered.component';
import {ErrorComponent} from './components/error/error.component';
import {HowtoComponent} from './pages/howto/howto.component';
import {AboutComponent} from './pages/about/about.component';
import {EditUserComponent} from "./components/edit-user/edit-user.component";
import {AfterSignUpComponent} from "./pages/after-sign-up/after-sign-up.component";
import {RestoreComponent} from "./pages/restore/restore.component";
import {AfterRestoreComponent} from "./pages/after-restore/after-restore.component";
import {ConfirmComponent} from "./pages/confirm/confirm.component";
import {GetrestoreComponent} from "./pages/getrestore/getrestore.component";


const routes: Routes = [

  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'error/:err',
    component: ErrorComponent
  },
  {
    path: 'editprofile',
    component: EditUserComponent
  },
  {
    path: 'aftersignup',
    component: AfterSignUpComponent
  },
  {
    path: 'reset/:userId/:resetCode',
    component: RestoreComponent
  },
  {
    path: 'getrestore',
    component: GetrestoreComponent
  },
  {
    path: 'afterrestore',
    component: AfterRestoreComponent
  },
  {
    path: 'confirm/:userId/:confirmCode',
    component: ConfirmComponent
  },
  {
    path: 'filter/:id',
    component: DashboardFilteredComponent
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
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {roles: ['RoleUser', 'RoleAdmin']}
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {roles: ['RoleUser', 'RoleAdmin']}
  },
  {
    path: 'additem',
    component: AdditemComponent,
    canActivate: [AuthGuard],
    data: {roles: ['RoleUser', 'RoleAdmin'], isEditing: false}
  },
  {
    path: 'edititem/:id',
    component: AdditemComponent,
    canActivate: [AuthGuard],
    data: {roles: ['RoleUser', 'RoleAdmin'], isEditing: true},
  },
  {
    path: 'edititem',
    redirectTo: ''
  },
  {
    path: 'search/:id/:searchText',
    component: DashboardFilteredComponent,
  },
  {
    path: 'howto',
    component: HowtoComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
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
