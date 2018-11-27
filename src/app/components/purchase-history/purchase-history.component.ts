import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  allOrders: Order[];
  userOrders: Order[];

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userOrders = [];
    // Obtengo todas las ordenes para luego filtrar las que son del user
    this.orderService.getOrders().subscribe(orders => {
      this.allOrders = orders;
      // Filtro las ordenes que son del cliente
      for (let i = 0; i < this.allOrders.length; i++) {
        if (this.allOrders[i].uid === this.authService.currentUser.uid) {
          const orderAux = this.userOrders.find(order => order.id === this.allOrders[i].id);
          if (orderAux) {
            const index = this.userOrders.indexOf(orderAux);
            this.userOrders[index] = this.allOrders[i];
          } else {
            this.userOrders.push(this.allOrders[i]);
          }
        }
      }
    });

  }

}
