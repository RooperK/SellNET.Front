import {ImageModel} from '../image/image.model';

export class CommentModel {
  authorName: string;
  authorAvatar?: ImageModel;
  text: string;
  creationTime: string;
  parentCommentId?: number;
  replies?: [];
  id: number;
}
