import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../models/user/user.model';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Role} from "../models/role/role";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly tokenName = '  login_session';
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private http: HttpClient) {
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

  login(login: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/User/login`, { login, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  signup(email: string, firstName: string, lastName: string, phoneNumber: string, password: string, confirmPassword: string) {
    return this.http.put<any>(`${environment.apiUrl}/User/signup`, { email, firstName, lastName, phoneNumber, password, confirmPassword })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
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
}
