import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  orders
  userId
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

  async getOrders() {
    await this.orderService.getOrders().snapshotChanges().subscribe(x=>{
      this.userId = x[0].payload.toJSON()['userId']
      this.orders = x
    })
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe()
  }

  viewOrder(id: string) {
    this.router.navigate(['/my/orders/order-details', id])
  }

  deleteOrder(id) {
    return this.orderService.deleteOrder(id)
  }
}
