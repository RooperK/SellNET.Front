import {ImageModel} from '../image/image.model';
import {LocationModel} from '../location/location.model';

export class AdvertisementPreviewModel {
  id: number;
  title: string;
  creationTime: string;
  location?: LocationModel;
  price: number;
  image: ImageModel;
}
