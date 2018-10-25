import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../../../models/Dish';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss']
})
export class DishCardComponent implements OnInit {
  @Input() dish: Dish;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  editDish(){
    this.router.navigate(['/edit-dish'], { queryParams: { id : this.dish.id } });
  }
}
