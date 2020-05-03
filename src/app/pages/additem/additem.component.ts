import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdvertisementService} from '../../services/advertisement-service';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageModel} from '../../models/image/image.model';
import {DadataAddress, DadataConfig, DadataSuggestion, DadataType, NgxDadataComponent} from '@kolkov/ngx-dadata';
import {LocationModel} from '../../models/location/location.model';
import {AdvertisementModel} from "../../models/advertisement/advertisement-model";
import {AuthenticationService} from "../../services/authentication-service";
import {InfoService} from "../../services/info.service";
import {Observable} from "rxjs";
import {ImageUploadComponent} from "../../components/image-upload/image-upload.component";

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AdditemComponent implements OnInit {

  isEditing: boolean;
  advertisement: AdvertisementModel;
  images: ImageModel[];
  currentLocation: LocationModel;
  currentCategoryId: number;
  loading = false;
  submitted = false;
  error = '';
  addressSelected = false;
  @ViewChild('imageUploadComponent', {static: true}) imageUploadComponent: ImageUploadComponent;

  addItemFormGroup: FormGroup;

  config: DadataConfig = {
    apiKey: '04980ee1c704186b7eed042bf0d88eb7be39cbff',
    type: DadataType.address
  };

  onAddressSelected(event: DadataSuggestion) {
    this.addressSelected = true;
    const addressData = event.data as DadataAddress;
    this.currentLocation = {country: addressData.country, region: addressData.region_with_type, city: addressData.city, street: addressData.street_with_type};
  }

  constructor(private router: Router, private authService: AuthenticationService,
              private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
              private advertisementService: AdvertisementService) { }

  ngOnInit() {
    this.isEditing = this.activatedRoute.snapshot.data.isEditing;
    if (this.isEditing) {
      this.loading = true;
      this.advertisementService.getAdvertisementById(this.activatedRoute.snapshot.params.id).subscribe(resp => {
        this.advertisement = resp as AdvertisementModel;
        if (this.advertisement.user.id !== this.authService.currentUserValue.id) {
          this.router.navigate(['/']);
        }
        this.f.item_title.setValue(this.advertisement.title);
        this.f.item_body.setValue(this.advertisement.text);
        this.f.item_price.setValue(this.advertisement.price);
        this.f.item_address.setValue(InfoService.parseAddress(this.advertisement.location));
        this.currentLocation = this.advertisement.location;
        this.addressSelected = true;
        this.imageUploadComponent.initImages();
        this.loading = false;
      });
    } else {
      this.currentLocation = {country: '', region: '', city: '', street: ''};
    }
    this.addItemFormGroup = this.formBuilder.group({
      item_title: ['', Validators.required],
      item_body: ['', Validators.required],
      item_price: ['', Validators.required],
      item_address: ['', Validators.required],
      item_category: ['', Validators.required]
    });
  }

  get f() { return this.addItemFormGroup.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.images === null || this.images.length === 0) {
      this.error = 'Добавьте хотя бы одну картинку';
      return;
    }

    if (this.currentCategoryId == null) {
      this.f.item_category.setErrors({error: true});

      this.error = 'Выберите категорию';
      return;
    }
    if (this.addressSelected === false) {
      this.f.item_address.setErrors({error: true});
      this.error = 'Выберите адрес из списка';
      return;
    }

    if (this.addItemFormGroup.invalid && this.addItemFormGroup.errors !== null) {
      return;
    }

    this.loading = true;

    if (this.isEditing) {
      this.advertisementService.editAdvertisement(this.f.item_title.value, this.f.item_body.value, this.currentLocation, this.currentCategoryId, this.images, Number.parseInt(this.f.item_price.value, 10), 1).pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/']);
          },
          error => {
            this.error = error;
            this.loading = false;
          });
    } else {
      this.advertisementService.postAdvertisement(this.f.item_title.value, this.f.item_body.value, this.currentLocation, this.currentCategoryId, this.images, Number.parseInt(this.f.item_price.value, 10), 1).pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/']);
          },
          error => {
            this.error = error;
            this.loading = false;
          });
    }
  }
}
