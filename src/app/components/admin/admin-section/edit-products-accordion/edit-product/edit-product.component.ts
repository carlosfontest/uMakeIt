import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { DishService } from 'src/app/services/dish.service';
import { SideDish } from 'src/app/models/SideDish';
import { SideDishService } from 'src/app/services/side-dish.service';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  allDishes: Dish[];
  sideDishes: SideDish[];
  selectedDish: Dish;
  editable: boolean;
  isLoading = false;


  constructor(
    private dishService: DishService,
    private sideDishService: SideDishService,
    private sds: SideDishService,
    private es: EditService
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
    if (dish.sideDishes) {
      this.editable = true;
    } else {
      this.editable = false;
    }
    this.selectedDish = dish;
    this.es.setSelected('dish');
  }

}
