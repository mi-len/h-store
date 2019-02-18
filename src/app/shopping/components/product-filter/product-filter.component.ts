import { Component, Input } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  @Input('category') category
  categories$

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories().snapshotChanges()
  }

}
