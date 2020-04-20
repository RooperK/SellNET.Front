import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdvertisementService} from '../../services/advertisement-service';
import {AdvertisementModel} from '../../models/advertisement/advertisement-model';
import {ImageModel} from '../../models/image/image.model';
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbCarousel,
  NgbCarouselConfig,
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../../services/user-service";
import {AuthenticationService} from "../../services/authentication-service";
import {first} from "rxjs/operators";
import {InfoService} from "../../services/info.service";
import {PictureService} from "../../services/picture.service";

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {

  id: number;
  advertisement: AdvertisementModel;
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  loading: boolean;

  constructor(private router: Router, private authService: AuthenticationService,
              private config: NgbCarouselConfig, private activatedRoute: ActivatedRoute,
              private advertisementService: AdvertisementService) {
    this.loading = true;
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.advertisementService.getAdvertisementById(this.id).subscribe(response => {
      this.advertisement = response as AdvertisementModel;
      if (this.advertisement.images == null || this.advertisement.images.length === 0) {
        this.onErrorPicture();
      }
      this.loading = false;
    });
    this.carousel.pause();
  }

  getDate(creationTime: string) {
    return InfoService.parseDate(creationTime);
  }

  onErrorPicture() {
    this.advertisement.images = [PictureService.placeholder1000];
  }

  getPictureSrc(image: ImageModel) {
    console.log(image);
    if (image.imageUrl.startsWith('SellNET')) {
      return `https://res.cloudinary.com/dennztta6/image/upload/w_700,h_700,c_fill/q_90/v1587033211/${image.imageUrl}`;
    } else {
      return image.imageUrl;
    }
  }
  getAddress() {
    return InfoService.parseAddress(this.advertisement.location);
  }

  getAvatar() {
    return PictureService.getAvatarSrc(this.advertisement.user.avatar)
  }

  deleteItem() {
    this.advertisementService.deleteAdvertisement(this.advertisement.id).pipe(first()).subscribe(data => {
        this.router.navigate(['/']);
      },
      error => {
      console.log(error);
    });
  }

  canDelete() {
    return this.authService.canDelete(this.advertisement);
  }

  canEdit() {
    return this.authService.canEdit(this.advertisement);
  }
}
