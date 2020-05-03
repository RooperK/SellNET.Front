import {Injectable} from '@angular/core';
import {LocationModel} from '../models/location/location.model';

@Injectable({ providedIn: 'root' })
export class InfoService {
  private static options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC+3'
  };

  constructor() {}

  public static parseDate(dateTime: string): string {
    const date = Date.parse(dateTime);
    return new Date(date).toLocaleString('ru-RU', this.options);
  }

  public static parseAddress(location: LocationModel) {
    let address = '';

    if (location.country !== null && location.country !== '') {
      address += location.country;
    }
    if (location.region !== null && location.region !== '') {
      address += ', ' + location.region;
    }
    if (location.city !== null && location.city !== '') {
      address += ', ' + location.city;
    }
    if (location.street !== null && location.street !== '') {
      address += ', ' + location.street;
    }

    return address;
  }
}
