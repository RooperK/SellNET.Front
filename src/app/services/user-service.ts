import {environment} from '../../environments/environment';
import {User} from '../models/user/user';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }
}

