import {Component, Input, OnInit} from '@angular/core';
import {AdvertisementModel} from '../../models/advertisement/advertisement-model';
import {ImageModel} from '../../models/image/image.model';
import {AdvertisementService} from '../../services/advertisement-service';
import {AdvertisementPreviewModel} from "../../models/advertisement/advertisement-preview.model";
import {PictureService} from "../../services/picture.service";
import {InfoService} from "../../services/info.service";

@Component({
  selector: 'app-advertisement-card',
  templateUrl: './advertisement-card.component.html',
  styleUrls: ['./advertisement-card.component.scss']
})
export class AdvertisementCardComponent implements OnInit {
  @Input() advertisement: AdvertisementPreviewModel;

  constructor() { }

  ngOnInit() {
    if (!this.advertisement.image) {
      this.onErrorPicture();
    }
  }

  onErrorPicture() {
    this.advertisement.image = PictureService.placeholder500;
  }

  getPictureSrc() {
    return PictureService.getPictureSrc(this.advertisement.image.imageUrl);
  }

  getDate(creationTime: string) {
    return InfoService.parseDate(creationTime);
  }
}
