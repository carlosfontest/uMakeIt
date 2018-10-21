import { Component, OnInit } from '@angular/core';
import { SideDish } from 'src/app/models/SideDish';
import { csLocale } from 'ngx-bootstrap';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.scss']
})
export class EditDishComponent implements OnInit {
  sideDishes: SideDish[];
  cantSideDishSelected: number;

  constructor() { }

  ngOnInit() {
    this.sideDishes = [
      {
        thumbnail: '../../../assets/images/ingredientes/vista/Brocoli.png',
        name: 'Broccoli'
      },
      {
        thumbnail: '../../../assets/images/ingredientes/vista/Camarones.png',
        name: 'Shrimp'
      },
      {
        thumbnail: '../../../assets/images/ingredientes/vista/Papas.png',
        name: 'Potatoes'
      },
      {
        thumbnail: '../../../assets/images/ingredientes/vista/PapasFritas.png',
        name: 'French Fries'
      },
      {
        thumbnail: '../../../assets/images/ingredientes/vista/Salchicha.png',
        name: 'Sausage'
      },
      {
        thumbnail: '../../../assets/images/ingredientes/vista/Tostones.png',
        name: 'Tostones'
      },
      {
        thumbnail: '../../../assets/images/ingredientes/vista/Vegetales.png',
        name: 'Vegetables'
      }
    ];

    this.cantSideDishSelected = 0;

  }

  onChangeCant(n: number) {
    // Ingredientes seleccionados en total
    this.cantSideDishSelected = this.cantSideDishSelected + n;
  }

}
