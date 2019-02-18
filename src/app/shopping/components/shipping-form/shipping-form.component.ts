import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping = {}; 
  userId
  cart
  cart$
  cartSubscription: Subscription
  userSubscription: Subscription

  constructor(
    private orderService: OrderService,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService
    ) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart()
    this.cartSubscription = this.cart$.valueChanges().subscribe(res => this.cart = res)
    this.shoppingCartService.getTotalPrice()
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe()

    this.userSubscription.unsubscribe()
  }

  async placeOrder() {
    let order = {
      userId: this.userId,
      dataPlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart['items'],
      totalPrice: this.shoppingCartService.totalPrice
    }

    let result = await this.orderService.placeOrder(order)

    this.router.navigate(['/order-success', result.key])
  }   

}
