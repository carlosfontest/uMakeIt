import { Component, OnInit, Input } from '@angular/core';
import { SideDish } from 'src/app/models/SideDish';

@Component({
  selector: 'app-side-dish-card',
  templateUrl: './side-dish-card.component.html',
  styleUrls: ['./side-dish-card.component.scss']
})
export class SideDishCardComponent implements OnInit {
  @Input() sideDish: SideDish;
  cant: number;

  constructor() { }

  ngOnInit() {
    this.cant = 0;
  }

  calculateMax(): number { // TODO
    return 2;
  }

  add() {
    if (this.cant < this.calculateMax()) {
      this.cant++;
    }
  }

  substract() {
    if (this.cant > 0) {
      this.cant--;
    }
  }

}
