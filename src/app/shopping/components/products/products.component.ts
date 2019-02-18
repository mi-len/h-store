import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {
  products: any[] = []
  filteredProducts: any[] = []
  category: string
  subscription: Subscription
  cart

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.cart = shoppingCartService.getCart()
    this.populateProducts()
  }

  populateProducts() {
    this.productService.getAll().snapshotChanges().subscribe(res => {
      this.products = this.filteredProducts = res

      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category')
        this.applyFilter()
      })
    })
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.payload.val()['category'] === this.category) :
      this.products
  }

  ngOnDestroy() {
    //  this.cart.unsubscribe() // ima problem tuk  TODO
  }
}
