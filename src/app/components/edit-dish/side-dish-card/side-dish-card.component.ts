import { Component, OnInit, Input } from '@angular/core';
import { SideDish } from 'src/app/models/SideDish';

@Component({
  selector: 'app-side-dish-card',
  templateUrl: './side-dish-card.component.html',
  styleUrls: ['./side-dish-card.component.scss']
})
export class SideDishCardComponent implements OnInit {
  @Input() sideDish: SideDish;

  constructor() { }

  ngOnInit() {
  }

}
