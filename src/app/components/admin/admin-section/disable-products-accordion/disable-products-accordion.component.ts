import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { SideDishService } from 'src/app/services/side-dish.service';
import { DishService } from 'src/app/services/dish.service';
import { SideDish } from 'src/app/models/SideDish';

@Component({
  selector: 'app-disable-products-accordion',
  templateUrl: './disable-products-accordion.component.html',
  styleUrls: ['./disable-products-accordion.component.scss']
})
export class DisableProductsAccordionComponent implements OnInit {
  allDishes: Dish[];
  sideDishes: SideDish[];
  selectedDish: Dish;
  editable: boolean;
  isLoading = false;


  constructor(
    private dishService: DishService,
    private sds: SideDishService
  ) { }

  ngOnInit() {

    // Le pedimos a Firestore los platos
    this.dishService.getDishes().subscribe(data => {
      this.allDishes = data;
    });

    // Cargamos todos los Side-Dishes
    this.sideDishes = [];

    this.sds.getSideDishes().subscribe(data => {
      this.sideDishes = data;
    });

    // Cargamos todos los Side-Dishes
    this.sideDishes = [];

    this.sds.getSideDishes().subscribe(data => {
      this.sideDishes = data;
    });
  }


  buscarSideDish(id: string): string {
    const sideDish = this.sideDishes.find(sideD => sideD.id === id);
    return sideDish ? sideDish.thumbnailPlatoArriba : '';
  }

  buscarSideDishDoble(id: string): string {
    const sideDish = this.sideDishes.find(sideD => sideD.id === id);
    return sideDish ? sideDish.thumbnailPlatoDoble : '';
  }

  selectDish(dish: Dish) {
    dish.disabled = !dish.disabled;

    // Se crea un Dish sin id
    const sendDish: Dish = JSON.parse(JSON.stringify(dish));

    delete sendDish.id;

    this.dishService.updateDish(sendDish, dish.id);
  }
}
