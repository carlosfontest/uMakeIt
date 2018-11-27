import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.component.html',
  styleUrls: ['./stats-section.component.scss']
})
export class StatsSectionComponent implements OnInit {
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
      this.pendingOrders = orders.length - this.ordersDone;
    }); 

  }

}
