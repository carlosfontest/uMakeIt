import { Component, OnInit } from '@angular/core';
import { Dish } from '../../models/Dish';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Tipo de plato que el user quiere que se muestre
  typeDishShow: string;
  // Array de los platos que se muestran en el menú
  showingDishes: Dish[];
  // Arrays de los diferentes tipos de platos
  allDishes: Dish[];
  // Para saber si ya se cargo la info de la base de datos
  loaded: boolean;

  constructor(private dishService: DishService) { }

  ngOnInit() {
    this.typeDishShow = 'Pizzas';
    this.loaded = false;

    // Le pedimos a Firestore los platos
    this.dishService.getDishes().subscribe(data => {
      this.loaded = false;
      this.allDishes = data;
      this.showingDishes = this.allDishes.filter(item => item.type === this.typeDishShow);
      this.loaded = true;
    });
  }

  showDish(dish: string) {
    this.typeDishShow = dish;
    this.showingDishes = this.allDishes.filter(item => item.type === dish);
  }

}
