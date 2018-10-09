import { Component, OnInit } from '@angular/core';
import { Dish } from '../../models/Dish';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Tipo de plato que el user quiere que se muestre
  typeDishShow: string;
  // Array de todos los platos que hay en el sistema
  dishes: Dish[];

  constructor() { }

  ngOnInit() {
    this.typeDishShow = 'Pizzas';

    // Platos Hardcode para las vistas
    this.dishes = [
      {
        thumbnail: '../../../assets/images/platos/Ensalada.png',
        name: 'Salad',
        type: 'Others',
        price: 12
      },
      {
        thumbnail: '../../../assets/images/platos/SopaCebolla.png',
        name: 'Onion Soup',
        type: 'Soups',
        price: 8
      },
      {
        thumbnail: '../../../assets/images/platos/Raviolis.png',
        name: 'Raviolis',
        type: 'Pastas',
        price: 15
      },
      {
        thumbnail: '../../../assets/images/platos/PizzaPepperonni.png',
        name: 'Pizza Peperonni',
        type: 'Pizzas',
        price: 6
      },
      {
        thumbnail: '../../../assets/images/platos/PizzaCapressa.png',
        name: 'Pizza Capressa',
        type: 'Pizzas',
        price: 8
      },
      {
        thumbnail: '../../../assets/images/platos/PizzaCapressa.png',
        name: 'Pizza Capressa',
        type: 'Pizzas',
        price: 8
      },
      {
        thumbnail: '../../../assets/images/platos/PizzaCapressa.png',
        name: 'Pizza Capressa',
        type: 'Pizzas',
        price: 8
      },
      {
        thumbnail: '../../../assets/images/platos/PizzaCapressa.png',
        name: 'Pizza Capressa',
        type: 'Pizzas',
        price: 8
      },
      {
        thumbnail: '../../../assets/images/platos/PizzaCapressa.png',
        name: 'Pizza Capressa',
        type: 'Pizzas',
        price: 8
      },
      {
        thumbnail: '../../../assets/images/platos/PizzaCapressa.png',
        name: 'Pizza Capressa',
        type: 'Pizzas',
        price: 8
      },
      {
        thumbnail: '../../../assets/images/platos/PizzaCapressa.png',
        name: 'Pizza Capressa',
        type: 'Pizzas',
        price: 8
      },
      {
        thumbnail: '../../../assets/images/platos/PizzaCapressa.png',
        name: 'Pizza Capressa',
        type: 'Pizzas',
        price: 8
      },
      {
        thumbnail: '../../../assets/images/platos/PizzaCapressa.png',
        name: 'Pizza Capressa',
        type: 'Pizzas',
        price: 8
      },
      {
        thumbnail: '../../../assets/images/platos/PizzaCapressa.png',
        name: 'Pizza Capressa',
        type: 'Pizzas',
        price: 8
      },
      {
        thumbnail: '../../../assets/images/platos/PizzaCapressa.png',
        name: 'Pizza Capressa',
        type: 'Pizzas',
        price: 8
      },
      {
        thumbnail: '../../../assets/images/platos/PizzaCapressa.png',
        name: 'Pizza Capressa',
        type: 'Pizzas',
        price: 8
      },
      {
        thumbnail: '../../../assets/images/platos/PizzaCapressa.png',
        name: 'Pizza Capressa',
        type: 'Pizzas',
        price: 8
      },
      {
        thumbnail: '../../../assets/images/platos/PizzaCapressa.png',
        name: 'Pizza Capressa',
        type: 'Pizzas',
        price: 8
      }
    ];
  }

  showDish(dish: string) {
    this.typeDishShow = dish;
  }

}
