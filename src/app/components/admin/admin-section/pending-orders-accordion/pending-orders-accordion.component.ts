import { Component, OnInit, Input, SimpleChanges, OnChanges, SimpleChange } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProductsModalComponent } from 'src/app/components/shared/modals/products-modal/products-modal.component';

@Component({
  selector: 'app-pending-orders-accordion',
  templateUrl: './pending-orders-accordion.component.html',
  styleUrls: ['./pending-orders-accordion.component.scss']
})
export class PendingOrdersAccordionComponent implements OnInit, OnChanges {
  @Input() pendingOrders: Order[];
  isLoading = true;
  names: any[];


  constructor(
    private ordersService: OrderService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
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
          const object = {id: order.uid, name: `${user.firstName} ${user.lastName}`};
          if(!this.names.find(a => a.id === object.id)){
            this.names.push(object);
          }
          this.names.push(`${user.firstName} ${user.lastName}`);
          if (index === orders.currentValue.length - 1) {
            this.isLoading = false;
          }
          index++;
        });
      }
    }

  }

  mostrarOrdenModal(orden: Order) {
    const initialState = {
      cart: orden.dishes,
      price: orden.price,
      direction: orden.direction,
      name: orden.name
    };
    this.modalService.show(ProductsModalComponent, {initialState}); 
    this.bsModalRef.hide();
  }

  deliverOrden(orden: Order) {
    const index = this.pendingOrders.indexOf(orden);
    orden.delivered = !orden.delivered;
    this.pendingOrders.slice(index, 1);
    this.ordersService.updateOrder(orden);
  }

  findName({uid}){
    return this.names.find(a => a.id === uid).name;
  }
}
