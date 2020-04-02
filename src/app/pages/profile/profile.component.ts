import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication-service';
import {UserService} from '../../services/user-service';
import {User} from '../../models/user/user';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = false;
  currentUser: User;
  userFromApi: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
      this.loading = false;
      this.userFromApi = user;
    });
  }
}
