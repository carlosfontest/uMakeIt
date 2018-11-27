import { Component, OnInit } from '@angular/core';
import { OrderDish } from 'src/app/models/OrderDish';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SortablejsOptions } from 'angular-sortablejs';
import { BillModalComponent } from '../bill-modal/bill-modal.component';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-reorder-modal',
  templateUrl: './edit-reorder-modal.component.html',
  styleUrls: ['./edit-reorder-modal.component.scss']
})
export class EditReorderModalComponent implements OnInit {
  cart: OrderDish[];
  dishesInOldCart: OrderDish[];
  dishesInNewCart: OrderDish[];
  normalOptions: SortablejsOptions = {
    group: 'normal-group'
  };

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private snotifyService: SnotifyService,
    private router: Router
  ) { }

  ngOnInit() {
    // Inicializamos los dos lados del sortable
    this.dishesInOldCart = this.cart.slice();
    this.dishesInNewCart = [];
  }

  proceed() {
    if (this.dishesInNewCart.length !== 0) {
      console.log(this.dishesInNewCart);
      const initialState = {
        cart: this.dishesInNewCart,
        price: this.calculatePrice()
      };
      this.bsModalRef.hide();
      this.bsModalRef = this.modalService.show(BillModalComponent, { initialState });
      this.router.navigate(['/']);
    } else {
      this.snotifyService.error('You have to place some article in the new order', 'Re-order', {
        timeout: 2500,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'leftBottom'
      });
    }
  }

  calculatePrice(): number {
    let price = 0;
    for (let i = 0; i < this.dishesInNewCart.length; i++) {
      price += this.dishesInNewCart[i].quantity * this.dishesInNewCart[i].dish.price;
    }
    console.log(price);
    return price;
  }

}
