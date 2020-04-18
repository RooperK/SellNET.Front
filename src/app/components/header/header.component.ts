import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication-service';
import {AdvertisementModel} from "../../models/advertisement/advertisement-model";
import {CategoryService} from "../../services/category-service";
import {CategoryModel} from "../../models/category/category.model";
import {Router} from "@angular/router";
import {PictureService} from "../../services/picture.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  categories: CategoryModel[];
  searchForm: FormGroup;
  constructor(private router: Router, private authService: AuthenticationService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl()
    });
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
    });
  }

  setCurrentCategory(category: CategoryModel) {
    this.categoryService.setCurrentCategory(category);
    this.router.navigate(['/filter', category.id]);
  }

  getCurrentCategoryName() {
    if (this.categoryService.getCurrentCategory()) {
      return this.categoryService.getCurrentCategory().name;
    } else {
      return 'Категория';
    }
  }

  getAvatar() {
    return PictureService.getAvatarSrc(this.authService.currentUserValue.avatar);
  }
}
