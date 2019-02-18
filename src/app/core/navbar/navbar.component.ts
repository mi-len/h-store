import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  productsInCart

  constructor(
    public auth: AuthService, 
    public userService: UserService,
    public shoppingCartService: ShoppingCartService
    ) {
  }
  
  ngOnInit() {
    this.productsInCart = this.shoppingCartService.getTotalItemsCount()
  }

  logout() {
    this.auth.logout()
  }
}
