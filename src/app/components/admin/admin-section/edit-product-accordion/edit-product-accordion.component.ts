import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-edit-product-accordion',
  templateUrl: './edit-product-accordion.component.html',
  styleUrls: ['./edit-product-accordion.component.scss']
})
export class EditProductAccordionComponent implements OnInit {
  allDishes: Dish[];

  constructor(private dishService: DishService) { }

  ngOnInit() {
    // Le pedimos a Firestore los platos
    this.dishService.getDishes().subscribe(data => {
      this.allDishes = data;
    });
  }

}
