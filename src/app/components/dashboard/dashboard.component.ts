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
  // Array de todos los platos que hay en el sistema
  dishes: Dish[];
  // Para saber si ya se cargo la info de la base de datos
  loaded: boolean;

  constructor(private dishService: DishService) { }

  ngOnInit() {
    this.typeDishShow = 'Pizzas';
    this.loaded = false;

    // Le pedimos a firestore los platos
    this.dishService.getDishes().subscribe(data => {
      this.dishes = data;
      this.loaded = true;
    });
  }

  showDish(dish: string) {
    this.typeDishShow = dish;
  }

}
