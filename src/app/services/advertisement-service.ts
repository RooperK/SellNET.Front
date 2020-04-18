import { Injectable } from '@angular/core';
import { AdvertisementModel } from '../models/advertisement/advertisement-model';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LocationModel} from '../models/location/location.model';
import {ImageModel} from '../models/image/image.model';
import {AuthenticationService} from "./authentication-service";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {


  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  getNewestAdvertisements(page: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Heisenberg/get_newest/${page}/${environment.pageSize}`)
  }

  getAdvertisementById(id: number) {
    return this.http.get(`${environment.apiUrl}/Heisenberg/get/${id}`);
  }

  deleteAdvertisement(id: number) {
    if (this.authService.isAdmin()) {
      return this.http.delete(`${environment.apiUrl}/Admin/delete_advert/${id}`);
    } else {
      return this.http.delete(`${environment.apiUrl}/Heisenberg/delete/${id}`);
    }
  }

  postAdvertisement(title: string, text: string, location: LocationModel, categoryId: number, images: ImageModel[], price: number, priceType: number) {
    console.log('post');
    return this.http.put(`${environment.apiUrl}/Heisenberg/post`, {title, text, location, categoryId, images, price, priceType});
  }

  getAdvertisementByCategory(id: number, page: number, size: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Heisenberg/get_paged/${id}/${page}/${size}`);
  }

}
