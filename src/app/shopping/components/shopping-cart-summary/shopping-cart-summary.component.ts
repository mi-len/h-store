import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { take } from 'rxjs/operators'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  cart
  items = []
  product = {}
  cartSubscription: Subscription
  cart$
  totalCartPrice: number = 0

  constructor( public shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart().valueChanges()
    this.cartSubscription = this.cart$.subscribe(res => {
      this.cart = res
        for (const key in this.cart.items) {
          if (this.cart.items.hasOwnProperty(key)) {
            this.product = {
              title: this.cart.items[key].product.title,
              quantity: this.cart.items[key].quantity,
              totalPrice: this.cart.items[key].quantity * this.cart.items[key].product.price
            }
            this.items.push(this.product)
            this.totalCartPrice += this.cart.items[key].quantity * this.cart.items[key].product.price
          }
        }
    })
  }
}
