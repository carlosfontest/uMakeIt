import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../../../models/Dish';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss']
})
export class DishCardComponent implements OnInit {
  @Input() dish: Dish;

  constructor() { }

  ngOnInit() {
  }

}
