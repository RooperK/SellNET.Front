import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication-service';
import {UserService} from '../../services/user-service';
import {UserModel} from '../../models/user/user.model';
import {first} from 'rxjs/operators';
import {PictureService} from "../../services/picture.service";
import {AdvertisementPreviewModel} from "../../models/advertisement/advertisement-preview.model";
import {AdvertisementService} from "../../services/advertisement-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = false;
  currentUser: UserModel;
  advertisements: AdvertisementPreviewModel[];

  constructor(private authService: AuthenticationService, private advertisementService: AdvertisementService) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.advertisementService.getNewestAdvertisements(1).subscribe(response => {
      this.advertisements = response;
    });
  }

  getAvatar() {
    return PictureService.getAvatarSrc(this.currentUser.avatar);
  }
}
