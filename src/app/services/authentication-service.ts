import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../models/user/user.model';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Role} from "../models/role/role";
import {AdvertisementModel} from "../models/advertisement/advertisement-model";
import {AdvertisementPreviewModel} from "../models/advertisement/advertisement-preview.model";
import {UserService} from "./user-service";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly tokenName = '  login_session';
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private http: HttpClient, private userService: UserService) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  private get currentUserRole(): Role {
    return this.currentUserValue.roles[0];
  }


  getSession(): string {
    return sessionStorage.getItem(this.tokenName);
  }

  canDelete(advertisement: AdvertisementModel) {
    return this.isLogged() && (this.isAdmin() ||
      this.currentUserValue.id === advertisement.user.id);
  }

  canEdit(advertisement: AdvertisementModel) {
    return this.isLogged() && this.currentUserValue.id === advertisement.user.id;
  }

  login(login: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/User/login`, { login, password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  signup(email: string, firstName: string, lastName: string, phoneNumber: string, password: string, confirmPassword: string, token: string) {
    return this.http.put<any>(`${environment.apiUrl}/User/signup`, { email, firstName, lastName, phoneNumber, password, confirmPassword, token })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }



  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    location.reload(true);
  }

  isLogged(): boolean {
    return !(this.currentUserValue == null);
  }

  isAdmin(): boolean {
    return this.currentUserRole === 'RoleAdmin';
  }

  refresh() {
    this.userService.getUser(this.currentUserValue.id).subscribe(resp => {
      const userRef = resp as UserModel;
      this.currentUserSubject.value.phoneNumber = userRef.phoneNumber;
      this.currentUserSubject.value.firstName = userRef.firstName;
      this.currentUserSubject.value.lastName = userRef.lastName;
      this.currentUserSubject.value.avatar = userRef.avatar;
    });
  }
}
