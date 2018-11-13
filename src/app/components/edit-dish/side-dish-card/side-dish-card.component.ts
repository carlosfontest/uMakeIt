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
  @Input() initialQuantity: number;
  @Output() changeCant: EventEmitter<any> = new EventEmitter();
  cant: number;

  constructor() { }

  ngOnInit() {
    this.cant = this.initialQuantity;
  }

  add() {
    // Aumentamos la cantidad del actual ingrediente y aumentamos el total en edit-dish
    if (this.cantSideDishSelected < 2) {
      this.cant++;
      this.changeCant.emit({num: 1, sideDish: this.sideDish});
    }
  }

  // Disminuimos la cantidad del actual ingrediente y disminuimos el total en edit-dish
  substract() {
    if (this.cantSideDishSelected > 0 && this.cant > 0) {
      this.cant--;
      this.changeCant.emit({num: -1, sideDish: this.sideDish});
    }
  }

}
