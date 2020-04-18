import {Component, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdvertisementModel} from "../../models/advertisement/advertisement-model";
import {AdvertisementService} from "../../services/advertisement-service";
import {environment} from "../../../environments/environment";
import {AdvertisementPreviewModel} from "../../models/advertisement/advertisement-preview.model";

@Component({
  selector: 'app-dashboard-filtered',
  templateUrl: './dashboard-filtered.component.html',
  styleUrls: ['./dashboard-filtered.component.scss']
})
export class DashboardFilteredComponent implements OnInit {

  currentId: number;
  page: number;
  advertisements: AdvertisementPreviewModel[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private advertisementService: AdvertisementService) {
    router.events.subscribe((val) => {
      if (this.activatedRoute.snapshot.params.id !== this.currentId) {
        this.currentId = this.activatedRoute.snapshot.params.id;
        this.page = 1;
        this.getCategories();
      }
    });
  }

  ngOnInit() {
    this.currentId = this.activatedRoute.snapshot.params.id;
    this.page = 1;
    this.advertisements = [];
    this.getCategories();
  }

  getCategories() {
    this.advertisementService.getAdvertisementByCategory(this.currentId, this.page, environment.pageSize).subscribe(response => {
      this.advertisements = response;
    });
  }

}
