import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  id: string
  order
  items: object[] = []
  isAdmin: boolean = false
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
    this.isAdmin = this.userService.isAdmin
  }

  async ngOnInit() {

    await this.orderService.getOrder(this.id).valueChanges().pipe(take(1)).subscribe(x => {
      this.order = x
      for (const item in this.order['items']) {
        if (this.order['items'].hasOwnProperty(item)) {
          this.items.push(this.order['items'][item])
        }
      }
    })
  }

  deleteOrder() {
    this.orderService.deleteOrder(this.id)
    this.router.navigate(['/products'])
  }

}
