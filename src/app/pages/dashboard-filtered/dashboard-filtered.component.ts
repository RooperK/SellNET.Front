import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdvertisementService} from '../../services/advertisement-service';
import {environment} from '../../../environments/environment';
import {AdvertisementPreviewModel} from '../../models/advertisement/advertisement-preview.model';

@Component({
  selector: 'app-dashboard-filtered',
  templateUrl: './dashboard-filtered.component.html',
  styleUrls: ['./dashboard-filtered.component.scss']
})
export class DashboardFilteredComponent implements OnInit {

  currentId: number;
  page: number;
  searchText: string;
  advertisements: AdvertisementPreviewModel[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private advertisementService: AdvertisementService) {
    router.events.subscribe((val) => {
      if (this.activatedRoute.snapshot.params.id !== this.currentId) {
        if (this.activatedRoute.snapshot.params.searchText) {
          this.searchText = this.activatedRoute.snapshot.params.searchText;
        }
        this.currentId = this.activatedRoute.snapshot.params.id;
        this.page = 1;
        this.getAdverts();
      }
    });
  }

  ngOnInit() {
    this.currentId = this.activatedRoute.snapshot.params.id;
    if (this.activatedRoute.snapshot.params.searchText) {
      this.searchText = this.activatedRoute.snapshot.params.searchText;
    }
    this.page = 1;
    this.advertisements = [];
    this.getAdverts();
  }

  getAdverts() {
    if (this.searchText) {
      this.advertisementService.searchAdvertisements(this.currentId, this.searchText, this.page, environment.pageSize).subscribe(response => {
        this.advertisements = response as AdvertisementPreviewModel[];
      });
    }
    this.advertisementService.getAdvertisementByCategory(this.currentId, this.page, environment.pageSize).subscribe(response => {
      this.advertisements = response;
    });
  }

}
