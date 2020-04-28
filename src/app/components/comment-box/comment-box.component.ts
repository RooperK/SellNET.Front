import {Component, Input, OnInit} from '@angular/core';
import {AdvertisementComponent} from "../../pages/advertisement/advertisement.component";
import {AdvertisementModel} from "../../models/advertisement/advertisement-model";
import {AuthenticationService} from "../../services/authentication-service";
import {PictureService} from "../../services/picture.service";
import {CommentsService} from "../../services/comments.service";
import {CommentModel} from "../../models/comment/comment.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {

  @Input() advertisement: AdvertisementModel;
  comments: CommentModel[];
  commentFormGroup: FormGroup;
  loading: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private commentsService: CommentsService) { }

  ngOnInit() {
    this.loading = false;
    this.getComments();
    this.commentFormGroup = this.formBuilder.group({
      item_text: ['', Validators.required]
    });
  }

  getAvatar(): string {
    return PictureService.getAvatarSrc(this.authService.currentUserValue.avatar);
  }

  getComments() {
    this.commentsService.getCommentsById(this.advertisement.id).subscribe(resp => {
      this.comments = resp;
    });
  }

  get f() { return this.commentFormGroup.controls; }

  onSubmit() {
    this.loading = true;
    this.addComment().subscribe(resp => {
      console.log(resp);
      this.loading = false;
      this.getComments();
      this.f.item_text.setValue('');
    });
  }

  addComment() {
    return this.commentsService.addComment(this.advertisement.id, this.f.item_text.value);
  }

  isLogged() {
    return this.authService.isLogged();
  }
}
