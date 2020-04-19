import {UserModel} from '../user/user.model';

export class CommentModel {
  author: UserModel;
  text: string;
  creationTime: string;
  parentCommentId?: number;
  replies?: [];
  id: number;
}
