import { Component, OnInit } from '@angular/core';
import { SideDish } from 'src/app/models/SideDish';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.scss']
})
export class EditDishComponent implements OnInit {
  sideDishes: SideDish[];

  constructor() { }

  ngOnInit() {
    this.sideDishes = [
      {
        thumbnail: '../../../assets/images/ingredientes/vista/Brocoli.png',
        name: 'Brocoli'
      },
      {
        thumbnail: '../../../assets/images/ingredientes/vista/Camarones.png',
        name: 'Camarones'
      },
      {
        thumbnail: '../../../assets/images/ingredientes/vista/Papas.png',
        name: 'Papas'
      },
      {
        thumbnail: '../../../assets/images/ingredientes/vista/PapasFritas.png',
        name: 'Papas Fritas'
      }
    ];


  }

}
