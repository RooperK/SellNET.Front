import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdvertisementService} from '../../services/advertisement-service';
import {AdvertisementPreviewModel} from '../../models/advertisement/advertisement-preview.model';

@Component({
  selector: 'app-dashboard-filtered',
  templateUrl: './dashboard-filtered.component.html',
  styleUrls: ['./dashboard-filtered.component.scss']
})
export class DashboardFilteredComponent implements OnInit {

  currentId: number;
  page = 1;
  searchText: string;
  advertisements: AdvertisementPreviewModel[];
  loading: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private advertisementService: AdvertisementService) {
    this.loading = true;
    router.events.subscribe((val) => {
      if (this.activatedRoute.snapshot.params.id !== this.currentId || this.activatedRoute.snapshot.params.searchText !== this.searchText) {
        if (this.activatedRoute.snapshot.params.searchText) {
          this.searchText = this.activatedRoute.snapshot.params.searchText;
        }
        this.currentId = this.activatedRoute.snapshot.params.id;
        this.advertisements = [];
        this.page = 1;
        this.getAdverts(this.page);
      }
    });
  }

  ngOnInit() {}

  getAdverts(page: number) {
    if (this.searchText) {
      this.advertisementService.getAdvertisements(page, this.currentId, this.searchText).subscribe(response => {
        for (const ad of response as AdvertisementPreviewModel[]) {
          this.advertisements.push(ad);
        }
        this.loading = false;
      });
    } else {
      this.advertisementService.getAdvertisements(page, this.currentId).subscribe(response => {
        for (const ad of response as AdvertisementPreviewModel[]) {
          this.advertisements.push(ad);
        }
        this.loading = false;
      });
    }
  }

  onScroll() {
    this.getAdverts(++this.page);
  }
}
