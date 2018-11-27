import { Component, OnInit } from '@angular/core';
import { OrderDish } from 'src/app/models/OrderDish';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-edit-reorder-modal',
  templateUrl: './edit-reorder-modal.component.html',
  styleUrls: ['./edit-reorder-modal.component.scss']
})
export class EditReorderModalComponent implements OnInit {
  cart: OrderDish[];
  dishesInOldCart: OrderDish[];
  dishesInNewCart: OrderDish[];

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    // Inicializamos los dos lados del sortable
    this.dishesInOldCart = this.cart;
    this.dishesInNewCart = [];
  }

  proceed() {

  }

}
