import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LocationModel} from '../models/location/location.model';
import {ImageModel} from '../models/image/image.model';
import {AuthenticationService} from './authentication-service';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  getAdvertisementById(id: number) {
    return this.http.get(`${environment.apiUrl}/Heisenberg/get/item=${id}`);
  }

  getAdvertisements(page: number, categoryId?: number, filter?: string) {
    let str = '';
    if (categoryId) {
      str += `/category=${categoryId}`;
    }
    if (filter) {
      str += `/filter=${filter}`;
    }
    return this.http.get(`${environment.apiUrl}/Heisenberg/get/page=${page}/size=${environment.pageSize}` + str);
  }

  deleteAdvertisement(id: number) {
    if (this.authService.isAdmin()) {
      return this.http.delete(`${environment.apiUrl}/Admin/delete_advert/${id}`);
    } else {
      return this.http.delete(`${environment.apiUrl}/Heisenberg/delete/${id}`);
    }
  }

  editAdvertisement(title: string, text: string, location: LocationModel, categoryId: number,
                    images: ImageModel[], price: number, type: number) {
    return this.http.put(`${environment.apiUrl}/Heisenberg/edit`,
      {title, text, location, categoryId, images, price, type});
  }

  postAdvertisement(title: string, text: string, location: LocationModel, categoryId: number,
                    images: ImageModel[], price: number, type: number) {
    return this.http.put(`${environment.apiUrl}/Heisenberg/post`,
      {title, text, location, categoryId, images, price, type});
  }

  getAdvertisementByUser(page: number, user: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Heisenberg/get/page=${page}/size=${environment.pageSize}/user=${user}`);
  }
}
