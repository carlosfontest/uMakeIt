import { Component, OnInit } from '@angular/core';
import { SideDish } from 'src/app/models/SideDish';
import { csLocale } from 'ngx-bootstrap';
import { SideDishService } from 'src/app/services/side-dish.service';
import { ActivatedRoute } from '@angular/router';
import { Dish } from './../../models/Dish';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.scss']
})
export class EditDishComponent implements OnInit {
  dish: Dish;
  sideDishes: SideDish[];
  cantSideDishSelected: number;
  // Para saber si ya se cargo la info de la base de datos
  loaded: boolean;

  constructor(private sideDishService: SideDishService,
    private ar: ActivatedRoute, 
    private ds: DishService) { }

  ngOnInit() {
    this.loaded = false;

    this.ds.getDishById(this.ar.snapshot.queryParams.id).subscribe(dish => {
      this.dish = dish;
      if(dish){
        this.sideDishService.getSideDishes().subscribe(data => {
          this.sideDishes = data;
          this.loaded = true;
        });
      } else{
        this.loaded = true;
      }
    });
    
    this.cantSideDishSelected = 0;
  }

  onChangeCant(n: number) {
    // Ingredientes seleccionados en total
    this.cantSideDishSelected = this.cantSideDishSelected + n;
  }

}
