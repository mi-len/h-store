import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products: any[]
  filteredProducts: any[]
  subscription: Subscription

  constructor(
    private productService: ProductService,
    private db: AngularFireDatabase
  ) {
    this.subscription = this.productService.getAll().snapshotChanges().subscribe(res => {
      this.products = this.filteredProducts = res
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.payload.val()['title'].toLowerCase().includes(query.toLowerCase())) :
      this.products
  }

}


