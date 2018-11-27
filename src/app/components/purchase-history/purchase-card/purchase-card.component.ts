import { Component, OnInit, Input } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';
import { take } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BillModalComponent } from '../../shared/modals/bill-modal/bill-modal.component';
import { EditReorderModalComponent } from '../../shared/modals/edit-reorder-modal/edit-reorder-modal.component';

@Component({
  selector: 'app-purchase-card',
  templateUrl: './purchase-card.component.html',
  styleUrls: ['./purchase-card.component.scss']
})
export class PurchaseCardComponent implements OnInit {
  @Input() order: Order;
  bsModalRef: BsModalRef;
  editState: boolean;
  nameAux: string;

  constructor(
    private snotifyService: SnotifyService,
    private orderService: OrderService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.editState = false;
  }

  editName() {
    this.editState = !this.editState;
    // Guardamos el nombre actual
    this.nameAux = this.order.name;
  }

  saveName() {
    this.editState = !this.editState; 

    if (this.order.name !== this.nameAux) {
      // Guardar en nuevo nombre en firestore
      this.orderService.getOrders().pipe(take(1)).subscribe(orders => {
        for (let i = 0; i < orders.length; i++) {
          if (orders[i].id === this.order.id) {
            const updatedOrder: Order = {
              dishes: this.order.dishes,
              price: this.order.price,
              date: this.order.date,
              uid: this.order.uid,
              id: this.order.id,
              name: this.order.name,
              direction: this.order.direction,
              delivered: this.order.delivered
            };
            this.orderService.updateOrder(updatedOrder);
            // Notificamos cambio exitoso
            this.snotifyService.success('The name of the purchase has changed successfully', 'Purchases', {
              timeout: 2500,
              showProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              position: 'leftBottom'
            });
          }
        }
      });
    }
  }

  reorder() {
    const initialState = {
      cart: this.order.dishes,
      price: this.order.price
    };
    this.bsModalRef = this.modalService.show(BillModalComponent, { initialState });
  }

  editAndReorder() {
    const initialState = {
      cart: this.order.dishes
    };
    this.bsModalRef = this.modalService.show(EditReorderModalComponent, { initialState });
  }

}
