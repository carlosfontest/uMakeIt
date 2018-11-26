import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  allOrders: Order[];
  userOrders: Order[];

  constructor() { }

  ngOnInit() {
    // Obtengo todas las ordenes para luego filtrar las que son del user
    this.allOrders = [];
  }

}
