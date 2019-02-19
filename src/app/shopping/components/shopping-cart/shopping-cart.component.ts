import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  // cart$: Observable<AngularFireAction<DatabaseSnapshot<{}>>>
  cartId
  products
  productIds = []
  totalPrice: number
  subscription: Subscription
  constructor(public shoppingCartService: ShoppingCartService) { 
    this.cartId = localStorage.getItem('cartId')
  }

  ngOnInit() {
    this.shoppingCartService.getTotalPrice()
    
    this.subscription = this.shoppingCartService
      .getCart()
      .snapshotChanges()
      .subscribe(res => {
        this.products = res.payload.toJSON()['items']
      
        this.productIds = this.products ? Object.keys(this.products) : null
        
        this.totalPrice = 0
        for (const key in this.products) {
          this.totalPrice += (this.products[key]['product']['price'] * this.products[key]['quantity'])
        }
      })
  }
 
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
