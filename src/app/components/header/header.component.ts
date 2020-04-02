import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchForm: FormGroup;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl()
    });
  }

}
