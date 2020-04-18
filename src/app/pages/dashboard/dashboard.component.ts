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

  constructor(private advertisementService: AdvertisementService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.setCurrentCategory(null);
    this.advertisementService.getNewestAdvertisements(1).subscribe(response => {
      this.advertisements = response;
      this.loading = false;
    });
  }

}
