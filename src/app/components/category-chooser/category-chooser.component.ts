import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category-service';
import {CategoryModel} from '../../models/category/category.model';
import {CategoryLevelModel} from '../../models/category/category-level.model';
import {AdditemComponent} from '../../pages/additem/additem.component';

@Component({
  selector: 'app-category-chooser',
  templateUrl: './category-chooser.component.html',
  styleUrls: ['./category-chooser.component.scss']
})
export class CategoryChooserComponent implements OnInit {

  private categories: CategoryModel[];
  categoryLevels: CategoryLevelModel[] = [];

  @Input() addItemComponent: AdditemComponent;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryLevels = [];
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
      this.categoryLevels.push({currentCategory: this.categories[0], categories: this.categories});
    });
  }

  setCategory(categoryLevel: CategoryLevelModel, category: CategoryModel) {
    categoryLevel.currentCategory = category;
    if (!(category.subCategories === undefined || category.subCategories.length === 0)) {
      const index = this.categoryLevels.indexOf(categoryLevel);

      if (index !== this.categoryLevels.length - 1) {
        if (index === 0 && this.categoryLevels.length !== 2) {
          for (let i = 0; i < (this.categoryLevels.length - index - 1); i++) {
            this.categoryLevels.pop();
          }
        }
        for (let i = 0; i < (this.categoryLevels.length - index); i++) {
          this.categoryLevels.pop();
        }
      }

      this.categoryLevels.push({currentCategory: category.subCategories[0], categories: category.subCategories});
    }
    console.log(this.categoryLevels[length].currentCategory.id);
    this.addItemComponent.currentCategoryId = this.categoryLevels[length].currentCategory.id;
  }

}
