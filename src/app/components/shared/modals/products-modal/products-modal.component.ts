import { Component, OnInit } from '@angular/core';
import { OrderDish } from 'src/app/models/OrderDish';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.scss']
})
export class ProductsModalComponent implements OnInit {
  cart: OrderDish[];
  price: number;
  direction: string;
  name: string;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

}
