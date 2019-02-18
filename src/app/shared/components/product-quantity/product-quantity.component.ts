import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product
  @Input('shopping-cart') shoppingCart
  @Input('id') productId
  @Input('quantity') productQuantity
  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  addToCart() {
    this.shoppingCartService.updateItemQuantity(this.productId, 1)
  }

  removeFromCart() {
    this.shoppingCartService.updateItemQuantity(this.productId, -1)
  }

  
  ngOnInit() {
    
  }

}
