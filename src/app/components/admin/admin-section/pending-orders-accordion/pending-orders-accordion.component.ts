import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pending-orders-accordion',
  templateUrl: './pending-orders-accordion.component.html',
  styleUrls: ['./pending-orders-accordion.component.scss']
})
export class PendingOrdersAccordionComponent implements OnInit {
  ordersPending: Order[] = [];
  

  constructor(
    private ordersService: OrderService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // Traemos todas las ordenes
    this.ordersService.getOrders().subscribe(orders => {
      for (let i = 0; i < orders.length; i++) {
        if (orders[i].delivered === false) {
          this.ordersPending.push(orders[i]);
        }
      }
    });
  }

}
