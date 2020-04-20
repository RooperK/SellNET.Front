import {Component, Input, OnInit} from '@angular/core';
import {AdvertisementComponent} from "../../pages/advertisement/advertisement.component";
import {PictureService} from "../../services/picture.service";
import {AdvertisementModel} from "../../models/advertisement/advertisement-model";
import {AdvertisementPreviewModel} from "../../models/advertisement/advertisement-preview.model";
import {InfoService} from "../../services/info.service";
import {AuthenticationService} from "../../services/authentication-service";
import {first} from "rxjs/operators";
import {AdvertisementService} from "../../services/advertisement-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-advertisement-long-card',
  templateUrl: './advertisement-long-card.component.html',
  styleUrls: ['./advertisement-long-card.component.scss']
})
export class AdvertisementLongCardComponent implements OnInit {

  @Input() advertisement: AdvertisementPreviewModel;
  @Input() isCurrUserProfilePage: boolean;
  constructor(private authService: AuthenticationService, private advertisementService: AdvertisementService) { }

  ngOnInit() {
    if (!this.advertisement.image) {
      this.onErrorPicture();
    }
  }

  onErrorPicture() {
    this.advertisement.image = PictureService.placeholder500;
  }

  getPicture() {
    return PictureService.getPictureSrc(this.advertisement.image.imageUrl);
  }

  getDate(creationTime: string) {
    return InfoService.parseDate(creationTime);
  }

  canEdit() {
    return this.isCurrUserProfilePage;
  }
  canDelete() {
    return this.isCurrUserProfilePage || this.authService.isAdmin();
  }

  deleteItem() {
    this.advertisementService.deleteAdvertisement(this.advertisement.id).pipe(first()).subscribe(data => {
        location.reload();
      },
      error => {
        console.log(error);
      });
  }
}
