import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { OrderDish } from 'src/app/models/OrderDish';

@Component({
  selector: 'app-bill-modal',
  templateUrl: './bill-modal.component.html',
  styleUrls: ['./bill-modal.component.scss']
})
export class BillModalComponent implements OnInit {
  cart: OrderDish[];

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  get precioTotal() {
    let price = 0;
    for (let i = 0; i < this.cart.length; i++) {
      price += this.cart[i].dish.price * this.cart[i].quantity;
    }
    return price;
  }

}
