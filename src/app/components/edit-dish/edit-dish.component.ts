import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SideDish } from 'src/app/models/SideDish';
import { csLocale, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { SideDishService } from 'src/app/services/side-dish.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  @ViewChild('modal') modal: TemplateRef<any>;
  bsModalRef: BsModalRef;
  // Para saber si ya se cargo la info de la base de datos
  loaded: boolean;

  constructor(private sideDishService: SideDishService,
    private ar: ActivatedRoute, 
    private ds: DishService, 
    private router: Router,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this.loaded = false;

    this.ds.getDishById(this.ar.snapshot.queryParams.id).subscribe(dish => {
      this.dish = dish;
      if (dish) {
        this.sideDishService.getSideDishes().subscribe(data => {
          this.sideDishes = data;
          this.loaded = true;
          this.abrirModalInstrucciones();
        });
      } else {
        this.router.navigate(['**']);
      }
    });
    
    this.cantSideDishSelected = 0;

    
  }

  onChangeCant(n: number) {
    // Ingredientes seleccionados en total
    this.cantSideDishSelected = this.cantSideDishSelected + n;
  }

  abrirModalInstrucciones() {
    this.bsModalRef = this.modalService.show(this.modal);
  }

}
