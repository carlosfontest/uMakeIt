import { Component, OnInit, Input } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';
import { take } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BillModalComponent } from '../../shared/modals/bill-modal/bill-modal.component';
import { EditReorderModalComponent } from '../../shared/modals/edit-reorder-modal/edit-reorder-modal.component';
import { DishService } from 'src/app/services/dish.service';
import { Dish } from 'src/app/models/Dish';

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
  dishes: Dish[];

  constructor(
    private snotifyService: SnotifyService,
    private orderService: OrderService,
    private modalService: BsModalService,
    private dishService: DishService
  ) { }

  ngOnInit() {
    this.editState = false;
    this.dishService.getDishes().subscribe(dishes => {
      this.dishes = dishes;
    });
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
    const newCart = [];

    // Verificamos si el dish está deshabilitado
    for (const dish of this.order.dishes) {
      if (!this.dishes.find(a => a.id === dish.dish.id).disabled) {
        newCart.push(dish);
      }
    }
    
    console.log(newCart);
    if (newCart.length !== 0) {
      const initialState = {
        cart: this.order.dishes,
        price: this.order.price
      };
      this.bsModalRef = this.modalService.show(BillModalComponent, { initialState });
    } else {
      this.snotifyService.warning('All the dishes in this purchase ara disabled', 'Re-order', {
        timeout: 2500,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'leftBottom'
      });
    }
  }

  editAndReorder() {
    const initialState = {
      cart: this.order.dishes
    };
    this.bsModalRef = this.modalService.show(EditReorderModalComponent, { initialState });
  }

}
