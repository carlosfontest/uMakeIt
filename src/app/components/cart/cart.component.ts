import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/Dish';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Dish[];
  dishQuantity: number[];
  totalPrice: number;

  constructor() { }

  ngOnInit() {
    this.totalPrice = 0;
    this.dishQuantity = [1, 4, 5, 2];

    this.cart = [
      {
        thumbnail: '../../../assets/images/platos/noEditables/ArrozConCamarones.png',
        name: 'Shrimp Rice',
        type: 'Others',
        price: 18
      },
      {
        thumbnail: '../../../assets/images/platos/noEditables/Panquecas.png',
        name: 'Pancakes',
        type: 'Others',
        price: 11
      },
      {
        thumbnail: '../../../assets/images/platos/noEditables/PizzaCapressa.png',
        name: 'Pizza Caprese',
        type: 'Pizzas',
        price: 8
      },
      {
        thumbnail: '../../../assets/images/platos/noEditables/Raviolis.png',
        name: 'Raviolis',
        type: 'Pastas',
        price: 13
      },
    ];
  }

  reduceQuantity(i: number) {
    if (this.dishQuantity[i] >= 2) {
      this.dishQuantity[i]--;
    }
  }

  increaseQuantity(i: number) {
    this.dishQuantity[i]++;
  }

  getSubtotal(): number {
    let amount = 0;
    
    for (let i = 0; i < this.cart.length; i++) {
      amount += this.cart[i].price * this.dishQuantity[i];
    }
    return amount;
  }

  getTaxes(): number {
    return this.getSubtotal() * 0.15;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTaxes();
  }

}
