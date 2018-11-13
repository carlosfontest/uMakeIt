import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { DishService } from 'src/app/services/dish.service';
import { SideDish } from 'src/app/models/SideDish';
import { SideDishService } from 'src/app/services/side-dish.service';

@Component({
  selector: 'app-edit-product-accordion',
  templateUrl: './edit-product-accordion.component.html',
  styleUrls: ['./edit-product-accordion.component.scss']
})
export class EditProductAccordionComponent implements OnInit {
  allDishes: Dish[];
  sideDishes: SideDish[];

  constructor(
    private dishService: DishService,
    private sideDishService: SideDishService
    ) { }

  ngOnInit() {
    // Le pedimos a Firestore los platos
    this.dishService.getDishes().subscribe(data => {
      this.allDishes = data;
    });

    // Cargamos todos los Side-Dishes
    this.sideDishes = [];

    this.sideDishService.getSideDishes().subscribe(data => {
      this.sideDishes = data;
    });
  }

  buscarSideDish(id: string): string {
    return this.sideDishes.find(sideDish => sideDish.id === id).thumbnailPlatoArriba;
  }
  
  buscarSideDishDoble(id: string): string {
    return this.sideDishes.find(sideDish => sideDish.id === id).thumbnailPlatoDoble;
  }

}
