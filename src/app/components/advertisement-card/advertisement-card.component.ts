import {Component, Input, OnInit} from '@angular/core';
import {IAdvertisementModel} from '../../models/advertisement/advertisement-model';
import {IImageModel} from '../../models/image-model';
import {AdvertisementService} from '../../services/advertisement-service';

@Component({
  selector: 'app-advertisement-card',
  templateUrl: './advertisement-card.component.html',
  styleUrls: ['./advertisement-card.component.scss']
})
export class AdvertisementCardComponent implements OnInit {
  @Input() advertisement: IAdvertisementModel;
  imgUrl: string;

  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit() {
    this.advertisementService.getImageByAdId(this.advertisement.id).subscribe(response => {
      if ((response as IImageModel[])[0] != null) {
        this.imgUrl = (response as IImageModel[])[0].url;
      } else {
        this.onPictureError();
      }
    });
  }

  onPictureError() {
    this.imgUrl = 'https://via.placeholder.com/300';
  }

}
