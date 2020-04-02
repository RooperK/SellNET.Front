import { Component, OnInit } from '@angular/core';
import {IAdvertisementModel} from '../../models/advertisement/advertisement-model';
import {AdvertisementService} from '../../services/advertisement-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  advertisements: IAdvertisementModel[];

  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit() {
    this.advertisementService.getAdvertisementList().subscribe(response => {
      this.advertisements = response;
      this.advertisementService.fakeAdvertisementList = response;
    });
  }

}
