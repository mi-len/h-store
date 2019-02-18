import { Component } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { log } from 'util';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$
  product = {}
  id
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
    this.categories$ = categoryService.getCategories().valueChanges()

    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) {
      this.productService.get(this.id).valueChanges().subscribe(x => {
        this.product = x
      })
    }
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product)
    else this.productService.create(product)

    this.router.navigate(['/admin/products'])
  }

  remove() {
    if (confirm('Are you shure you want to delete this product?')) {
      this.productService.remove(this.id)
      this.router.navigate(['/admin/products'])
    }
  }
}
