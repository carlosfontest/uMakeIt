import { Component, OnInit } from '@angular/core';
import { SideDish } from 'src/app/models/SideDish';
import { csLocale } from 'ngx-bootstrap';
import { SideDishService } from 'src/app/services/side-dish.service';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.scss']
})
export class EditDishComponent implements OnInit {
  sideDishes: SideDish[];
  cantSideDishSelected: number;
  // Para saber si ya se cargo la info de la base de datos
  loaded: boolean;

  constructor(private sideDishService: SideDishService) { }

  ngOnInit() {
    this.loaded = false;
    this.cantSideDishSelected = 0;

    this.sideDishService.getSideDishes().subscribe(data => {
      this.sideDishes = data;
      this.loaded = true;
    });
    

  }

  onChangeCant(n: number) {
    // Ingredientes seleccionados en total
    this.cantSideDishSelected = this.cantSideDishSelected + n;
  }

}
