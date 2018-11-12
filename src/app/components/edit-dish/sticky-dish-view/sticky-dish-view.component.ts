import { Component, OnInit, Input } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { SideDish } from 'src/app/models/SideDish';
import { SideDishService } from 'src/app/services/side-dish.service';

@Component({
  selector: 'app-sticky-dish-view',
  templateUrl: './sticky-dish-view.component.html',
  styleUrls: ['./sticky-dish-view.component.scss']
})
export class StickyDishViewComponent implements OnInit {
  @Input() dish: Dish;
  sideDishes: SideDish[];

  constructor(private sideDishService: SideDishService) { }

  ngOnInit() {
    this.sideDishes = [];
    // Obtenemos los Side-Dishes del plato en caso de que sea editable
    if (this.dish.sideDishes) {
      // Obtenemos el Side-Dish uno
      this.sideDishService.getSideDishById(this.dish.sideDishes[0]).subscribe(data => {
        this.sideDishes[0] = data;
      });
      // Obtenemos el Side-Dish dos
      this.sideDishService.getSideDishById(this.dish.sideDishes[1]).subscribe(data => {
        this.sideDishes[1] = data;
      });
    }
  }
  

}
