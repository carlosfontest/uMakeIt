import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

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
