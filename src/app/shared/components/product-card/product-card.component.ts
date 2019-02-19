import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input('product') product
  @Input('show-actions') showActions = true
  @Input('shopping-cart') shoppingCart
  id

  constructor(private shoppingCartService: ShoppingCartService) { }
  productCount: number
  subscription: Subscription

  addToCart(id) {
    this.shoppingCartService.updateItemQuantity(id, -1, this.product)
  }

  removeFromCart(id) {
    this.shoppingCartService.updateItemQuantity(id, 1, this.product)
  }

  getQuantity() {
    if (!this.shoppingCart) return 0
    this.productCount = 0
    this.id = this.product.key
    this.subscription = this.shoppingCart
      // .pipe(take(1))
      .subscribe(x => {
        if (!x.payload.toJSON()['items']) {
          this.productCount = 0
          return
        }
        if (x.payload.toJSON()['items'][this.id] !== undefined) {
          this.productCount = x.payload.toJSON()['items'][this.id].quantity
        } else {
          this.productCount = 0
        }
      })
  }

  ngOnInit() {
    this.getQuantity()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
