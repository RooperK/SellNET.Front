import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from '../../models/comment/comment.model';
import {PictureService} from '../../services/picture.service';
import {InfoService} from '../../services/info.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

  @Input() comment: CommentModel;
  constructor() { }

  ngOnInit() {
  }

  getAvatar() {
    return PictureService.getAvatarSrc(this.comment.author.avatar);
  }

  getDate() {
    return InfoService.parseDate(this.comment.creationTime);
  }
}
