import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, DatabaseSnapshot, AngularFireAction } from 'angularfire2/database';
// import { create } from 'domain';
import { take } from 'rxjs/operators'
import { first } from 'rxjs/operators'
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnDestroy{
  countItems: number
  totalPrice: number = 0
  // cart
  // subscription: Subscription
  // productCount: number

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
      items: []
    })
  }

  getCart() {
    let cartId = this.getOrCreateCartId()
    return this.db.object('/shopping-carts/' + cartId)
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId)
  }

  private getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId')
    if (!cartId) {
      this.create().then(result => {
        localStorage.setItem('cartId', result.key)
        return this.getCart()
      })
    } else {
      return cartId
    }
  }

  addToCart(product) {
    let cartId = this.getOrCreateCartId()
    let id = product.key
    this.db.object('/shopping-carts/'+ cartId + '/items/' + id )
            .update({product: product.payload.toJSON(), quantity: 1})
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId()
    this.db.object('/shopping-carts/' + cartId +'/items').remove()
  }

  async updateItemQuantity(id, change, product?){ 

    let cartId = await this.getOrCreateCartId()

    this.db.object('/shopping-carts/'+ cartId + '/items/' + id )
      .valueChanges()
      .pipe(take(1))
      .subscribe(res => {
        if((res['quantity'] + change) === 0) {
          this.db.object('/shopping-carts/'+ cartId + '/items/' + id )
            .remove() // remove item from cart if quantity is 0
        } else {
          this.db.object('/shopping-carts/'+ cartId + '/items/' + id )
            .update({quantity: res['quantity'] + change})
        }
      })
  }

  getTotalItemsCount() {
    let cart$ = this.getCart().valueChanges().subscribe(res => {
      this.countItems = 0
      for (const productId in res['items']) {
        this.countItems += res['items'][productId]['quantity']
      }
      return this.countItems
    })
  }

  getTotalPrice() {
    this.getCart().valueChanges().subscribe(res=> {
      let products = res['items']
      this.totalPrice = 0
       for (const key in products) {
          this.totalPrice += (products[key]['product']['price'] * products[key]['quantity'])
        }
    })
   
  
  }
  
  testReturnInput(input) { // temp for del=+++=
    console.log('input: ', input);
    return input
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe()
  }
}
