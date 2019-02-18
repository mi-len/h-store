import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  userId: string
  orders
  ordersSubscription: Subscription

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    this.ordersSubscription = await this.authService.user$.subscribe(user => this.userId = user.uid)
    this.getOrders()
  }

  getOrders() {
    this.orderService.getOrdersByUser(this.userId).snapshotChanges().subscribe(x => {
      this.orders = x
    })
  }

  viewOrder(id: string) {
    this.router.navigate(['/my/orders/order-details', id])
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe()
  }

}
