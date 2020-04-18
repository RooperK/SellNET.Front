import { Component, OnInit } from '@angular/core';
import {AdvertisementModel} from '../../models/advertisement/advertisement-model';
import {CategoryModel} from '../../models/category/category.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryLevelModel} from '../../models/category/category-level.model';
import {CategoryChooserComponent} from '../../components/category-chooser/category-chooser.component';
import {AdvertisementService} from '../../services/advertisement-service';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageModel} from '../../models/image/image.model';
import {DadataAddress, DadataConfig, DadataSuggestion, DadataType} from "@kolkov/ngx-dadata";
import {LocationModel} from "../../models/location/location.model";

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AdditemComponent implements OnInit {

  isEditing: boolean;
  images: ImageModel[];
  currentLocation: LocationModel;
  currentCategoryId: number;
  loading = false;
  submitted = false;
  error = '';
  addressSelected = false;

  addItemFormGroup: FormGroup;

  config: DadataConfig = {
    apiKey: '04980ee1c704186b7eed042bf0d88eb7be39cbff',
    type: DadataType.address
  };

  onAddressSelected(event: DadataSuggestion) {
    this.addressSelected = true;
    const addressData = event.data as DadataAddress;
    console.log(addressData);
    this.currentLocation = {country: addressData.country, region: addressData.region_with_type, city: addressData.city, street: addressData.street};
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private advertisementService: AdvertisementService) { }

  ngOnInit() {
    console.log(this.activatedRoute.pathFromRoot);
    this.currentLocation = {country: '', region: '', city: '', street: ''};
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
      this.error = 'Введите адрес';
      return;
    }

    if (this.addItemFormGroup.invalid && this.addItemFormGroup.errors !== null) {
      return;
    }

    this.loading = true;

    console.log('post');

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
