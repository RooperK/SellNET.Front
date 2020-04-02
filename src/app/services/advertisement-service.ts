import { Injectable } from '@angular/core';
import { IAdvertisementModel } from '../models/advertisement/advertisement-model';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  fakeAdvertisementList: IAdvertisementModel[];

  constructor(private http: HttpClient) {
  }

  getAdvertisementList(): Observable<any> {
      return this.http.get('https://next.json-generator.com/api/json/get/N1M79IXUu');
  }

  getAdvertisementById(id: number) {
      return this.http.get('https://next.json-generator.com/api/json/get/N1M79IXUu');
  }


  getImageByAdId(id: number) {
    return this.http.get(`${environment.apiUrl}/Advert/0/5/20`);
    // return this.http.get(`${environment.apiUrl}/image/${id}`);
  }
}
