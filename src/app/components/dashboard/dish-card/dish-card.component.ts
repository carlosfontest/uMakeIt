import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Dish } from '../../../models/Dish';
import { Router } from '@angular/router';
import { SideDishService } from 'src/app/services/side-dish.service';
import { SideDish } from 'src/app/models/SideDish';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss']
})
export class DishCardComponent implements OnInit {
  @Input() dish: Dish;
  @Output() cartEvent: EventEmitter<Dish> = new EventEmitter();
  sideDishes: SideDish[];

  constructor(
    private router: Router,
    private sideDishService: SideDishService
    ) { }

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

  editDish() {
    this.router.navigate(['/edit-dish'], { queryParams: { id : this.dish.id } });
  }

  addDish() {
    this.cartEvent.emit(this.dish);
  }

  buscarSideDishDoble(id: string): string {
    return '';
  }

  buscarSideDish(id: string): string {
    return '';
  }
}
