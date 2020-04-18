import {environment} from '../../environments/environment';
import {UserModel} from '../models/user/user.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get<UserModel>(`${environment.apiUrl}/users/${id}`);
  }
}

