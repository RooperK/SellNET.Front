import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../models/category/category.model';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {CategoryService} from '../../services/category-service';
import {Router} from '@angular/router';

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: number;
}

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  constructor(private router: Router, private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe(response => {
      this.dataSource.data = response;
    });
  }

  private _transformer = (node: CategoryModel, level: number) => {
    return {
      expandable: !!node.subCategories && node.subCategories.length > 0,
      name: node.name,
      id: node.id,
      level,
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.subCategories);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  setCurrentCategory(category: CategoryModel) {
    this.categoryService.setCurrentCategory(category);
    this.router.navigate(['/filter', category.id]);
  }

  ngOnInit() {

  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
