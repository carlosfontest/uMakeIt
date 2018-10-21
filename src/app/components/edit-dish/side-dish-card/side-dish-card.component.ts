import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SideDish } from 'src/app/models/SideDish';

@Component({
  selector: 'app-side-dish-card',
  templateUrl: './side-dish-card.component.html',
  styleUrls: ['./side-dish-card.component.scss']
})
export class SideDishCardComponent implements OnInit {
  @Input() sideDish: SideDish;
  @Input() cantSideDishSelected: number;
  @Output() changeCant: EventEmitter<number> = new EventEmitter();
  cant: number;

  constructor() { }

  ngOnInit() {
    this.cant = 0;
  }

  calculateMax(): number { // TODO
    return 2;
  }

  add() {
    if (this.cantSideDishSelected < 2) {
      this.cant++;
      this.changeCant.emit(1);
    }
  }

  substract() {
    if (this.cantSideDishSelected > 0 && this.cant > 0) {
      this.cant--;
      this.changeCant.emit(-1);
    }
  }

}
