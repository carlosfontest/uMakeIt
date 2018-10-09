import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {

  list: any[] = [];
  price: number;

  constructor() { }

  ngOnInit() {
    this.list.push({name: 'Pasta', quantity: '3', price: '50'});
    this.list.push({name: 'Pasta', quantity: '3', price: '50'});
    this.list.push({name: 'Pasta', quantity: '3', price: '50'});
    this.list.push({name: 'Pasta', quantity: '3', price: '50'});

    this.price = 200;
  }

}
