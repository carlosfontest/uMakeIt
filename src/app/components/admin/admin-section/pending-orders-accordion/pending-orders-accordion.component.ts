import { Component, OnInit, Input, SimpleChanges, OnChanges, SimpleChange } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pending-orders-accordion',
  templateUrl: './pending-orders-accordion.component.html',
  styleUrls: ['./pending-orders-accordion.component.scss']
})
export class PendingOrdersAccordionComponent implements OnInit, OnChanges {
  @Input() pendingOrders: Order[];
  isLoading = true;
  names: string[];


  constructor(
    private ordersService: OrderService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.names = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    const orders: SimpleChange = changes.pendingOrders;

    if (orders.currentValue && orders.currentValue.length !== 0) {
      let index = 0;
      for (const order of orders.currentValue) {
        this.userService.getUserById(order.uid).pipe(take(1)).subscribe(user => {
          this.names.push(`${user.firstName} ${user.lastName}`);
          if (index === orders.currentValue.length - 1) {
            this.isLoading = false;
          }
          index++;
        });
      }
    }

  }

  mostrarOrdenModal(orden: Order){
    alert('lanzate el modal, fuengo?');
  }

  deliverOrden(orden: Order){
    const index = this.pendingOrders.indexOf(orden);
    orden.delivered = !orden.delivered;
    this.pendingOrders.slice(index,1);
    this.ordersService.updateOrder(orden);
  }


}
