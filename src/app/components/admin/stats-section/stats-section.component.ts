import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.component.html',
  styleUrls: ['./stats-section.component.scss']
})
export class StatsSectionComponent implements OnInit {
  @Output() newPending: EventEmitter<Order[]> = new EventEmitter;
  userCount: number;
  totalSales: number;
  ordersDone: number;
  pendingOrders: number;

  constructor(
    private userService: UserService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    // Obtenemos la cantidad de users registrados
    this.userService.getUsers().subscribe(users => {
      this.userCount = users.length;
    });
    
    this.orderService.getOrders().subscribe(orders => {
      let doneOrders = 0;
      let totalPrice = 0;
      for (const order of orders) {
        if(order.delivered){
          doneOrders++;
        }
        totalPrice += order.price;
      }
      this.totalSales = totalPrice;
      this.ordersDone = doneOrders;

      const pendingOrders = orders.filter(order => !order.delivered);

      this.newPending.emit(pendingOrders);

      this.pendingOrders = pendingOrders.length;

    }); 

  }

}
