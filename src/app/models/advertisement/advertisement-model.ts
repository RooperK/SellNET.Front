import { TagModel } from '../tag/tag-model';
import {ImageModel} from '../image/image.model';
import {LocationModel} from '../location/location.model';
import {UserModel} from '../user/user.model';

export class AdvertisementModel {
  id: number;
  title: string;
  text?: string;
  categoryId?: number;
  categoryModel?: unknown;
  comments?: unknown[];
  tags?: Array<TagModel>;
  creationTime: string;
  lastEditTime?: string;
  location?: LocationModel;
  price: number;
  images?: ImageModel[];
  user: UserModel;
}
