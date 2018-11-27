import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  pendingOrders: Order[];
  isLoading: boolean;
  
  constructor(
  ) { }

  ngOnInit() {
    this.isLoading = true;
  }

  updatePending(orders: Order[]){
    this.pendingOrders = orders;
    this.isLoading = false;
  }
}
