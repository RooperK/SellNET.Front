import { TagModel } from '../tag/tag-model';
import {IImageModel} from '../image-model';

export interface IAdvertisementModel {
  id: number;
  title: string;
  body: string;
  categoryId: number;
  categoryModel: unknown;
  comments?: unknown[];
  tags?: Array<TagModel>;
  creationTime: string;
  address: string;
  price: number;
}
