import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SideDish } from 'src/app/models/SideDish';
import { csLocale, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { SideDishService } from 'src/app/services/side-dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from './../../models/Dish';
import { DishService } from 'src/app/services/dish.service';
import { EditInstructionsModalComponent } from '../shared/modals/edit-instructions-modal/edit-instructions-modal.component';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.scss']
})
export class EditDishComponent implements OnInit {
  dish: Dish;
  dishSideDishes: SideDish[];
  sideDishes: SideDish[];
  cantSideDishSelected: number;
  bsModalRef: BsModalRef;
  // Para saber si ya se cargo la info de la base de datos
  loaded: boolean;

  constructor(private sideDishService: SideDishService,
    private ar: ActivatedRoute,
    private dishService: DishService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.loaded = false;
    this.dishSideDishes = [];

    this.dishService.getDishById(this.ar.snapshot.queryParams.id).subscribe(dish => {
      this.loaded = false;
      this.dish = dish;
      if (dish) {
        this.sideDishService.getSideDishes().subscribe(data => {
          this.sideDishes = data;
          // Obtenemos los Side-Dishes del plato en caso de que sea editable
          if (this.dish.sideDishes) {
            // Obtenemos el Side-Dish uno
            this.sideDishService.getSideDishById(this.dish.sideDishes[0]).subscribe(data2 => {
              this.dishSideDishes[0] = data2;
              // Obtenemos el Side-Dish dos
              this.sideDishService.getSideDishById(this.dish.sideDishes[1]).subscribe(data3 => {
                this.dishSideDishes[1] = data3;
                this.cantSideDishSelected = this.dishSideDishes.length;
                this.loaded = true;
                this.abrirModalInstrucciones();
              });
            });
          }
        });
      } else {
        this.router.navigate(['**']);
      }

    });
  }

  onChangeCant(n: any) {
    // Ingredientes seleccionados en total
    this.cantSideDishSelected = this.cantSideDishSelected + n.num;

    // Si se agrega
    if (n.num > 0) {
      if (this.dishSideDishes[0] == null) {
        // Poner en la primera posición
        this.dishSideDishes[0] = n.sideDish;
        console.log(n.sideDish.id);
      } else {
        // Poner en la segunda posición
        this.dishSideDishes[1] = n.sideDish;
        console.log(n.sideDish.id);
      }
    }

    // Si se quita
    if (n.num < 0) {
      for (let i = 0; i < this.dishSideDishes.length; i++) {
        if (this.dishSideDishes[i]) {
          if (this.dishSideDishes[i].id === n.sideDish.id) {
            this.dishSideDishes[i] = null;
            console.log(this.dishSideDishes);
            return;
          }
        }
      }
    }
  }

  abrirModalInstrucciones() {
    this.bsModalRef = this.modalService.show(EditInstructionsModalComponent);
  }

  obtenerCantidadInicial(sideDish: SideDish) {
    let cant = 0;

    for (const sideDishItem of this.dishSideDishes) {
      if (sideDishItem) {
        if (sideDishItem.id === sideDish.id) {
          cant++;
        }
      }
    }

    return cant;
  }

}
