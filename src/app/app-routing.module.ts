import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AdvertisementComponent} from './pages/advertisement/advertisement.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {AuthGuard} from './_helpers/auth.guard';
import {Role} from './models/role/role';
import {AdditemComponent} from "./pages/additem/additem.component";
import {EdititemComponent} from "./pages/edititem/edititem.component";
import {DashboardFilteredComponent} from "./pages/dashboard-filtered/dashboard-filtered.component";
import {ErrorComponent} from "./components/error/error.component";
import {SearchComponent} from "./pages/search/search.component";


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
    component: ProfileComponent
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
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
