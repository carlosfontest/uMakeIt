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
  @Input() sideDishes: SideDish[];

  constructor(private sideDishService: SideDishService) { }

  ngOnInit() {
    console.log(this.sideDishes);
  }
  

}
