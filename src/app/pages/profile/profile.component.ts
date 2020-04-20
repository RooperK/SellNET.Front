import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication-service';
import {UserService} from '../../services/user-service';
import {UserModel} from '../../models/user/user.model';
import {first} from 'rxjs/operators';
import {PictureService} from '../../services/picture.service';
import {AdvertisementPreviewModel} from '../../models/advertisement/advertisement-preview.model';
import {AdvertisementService} from '../../services/advertisement-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = false;
  user: UserModel;
  advertisements: AdvertisementPreviewModel[];
  page = 1;

  constructor(private authService: AuthenticationService, private advertisementService: AdvertisementService,
              private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.loading = true;
    this.authService.refresh();
    let id: number;
    if (this.activatedRoute.snapshot.params.id && (this.authService.currentUserValue.id !== this.activatedRoute.snapshot.params.id)) {
      id = this.activatedRoute.snapshot.params.id;
    } else {
      id = this.authService.currentUserValue.id;
    }
    this.userService.getUser(id).subscribe(resp => {
      this.user = resp;
      this.getAdverts(this.page);
    });
  }

  getAdverts(page: number) {
    this.advertisementService.getAdvertisementByUser(page, this.user.id).subscribe(response => {
      this.advertisements = response;
      this.loading = false;
    });
  }

  isCurrent() {
    return this.user.id === this.authService.currentUserValue.id;
  }

  getAvatar() {
    return PictureService.getAvatarSrc(this.user.avatar);
  }
}
