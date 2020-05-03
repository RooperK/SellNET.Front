import { Component, OnInit } from '@angular/core';
import {AdvertisementModel} from '../../models/advertisement/advertisement-model';
import {AdvertisementService} from '../../services/advertisement-service';
import {CategoryService} from '../../services/category-service';
import {AdvertisementPreviewModel} from "../../models/advertisement/advertisement-preview.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  advertisements: AdvertisementPreviewModel[];
  loading = true;
  page = 1;

  constructor(private advertisementService: AdvertisementService, private categoryService: CategoryService) {
    this.advertisements = [];
  }

  ngOnInit() {
    this.categoryService.setCurrentCategory(null);
    this.getAds(this.page);
  }

  onScroll() {
    this.getAds(++this.page);
  }

  getAds(page: number) {
    this.advertisementService.getAdvertisements(page).subscribe(response => {
      for (const ad of response as AdvertisementPreviewModel[]) {
        this.advertisements.push(ad);
      }
      this.loading = false;
    });
  }
}
