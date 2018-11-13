import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { DishService } from 'src/app/services/dish.service';
import { SideDish } from 'src/app/models/SideDish';
import { SideDishService } from 'src/app/services/side-dish.service';
import { StorageService } from 'src/app/services/storage.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product-accordion',
  templateUrl: './edit-product-accordion.component.html',
  styleUrls: ['./edit-product-accordion.component.scss']
})
export class EditProductAccordionComponent implements OnInit {
  form: FormGroup;
  allDishes: Dish[];
  sideDishes: SideDish[];
  selectedDish: Dish;
  files: File[];
  types: string[];
  isLoading = false;


  constructor(
    private dishService: DishService,
    private sideDishService: SideDishService,
    private ss: StorageService,
    private fb: FormBuilder,
    private sds: SideDishService
  ) { }

  ngOnInit() {
    // this.files = [];
    // Le pedimos a Firestore los platos
    this.dishService.getDishes().subscribe(data => {
      this.allDishes = data;
    });

    // Cargamos todos los Side-Dishes
    this.sideDishes = [];

    this.sideDishService.getSideDishes().subscribe(data => {
      this.sideDishes = data;
    });

    // Cargamos todos los Side-Dishes
    this.sideDishes = [];

    this.sds.getSideDishes().subscribe(data => {
      this.sideDishes = data;
    });

    // this.types = ['Pizzas', 'Fishes', 'Soups', 'Pastas', 'Others'];


    // this.ss.subjectEdit.subscribe(file => {
    //   this.files[0] = file;
    //   this.form = this.fb.group({
    //     name: ['', Validators.required],
    //     type: ['', Validators.required],
    //     price: ['', Validators.required],
    //     sidedish1: ['', Validators.required],
    //     sidedish2: ['', Validators.required]
    //   });
      
    //   const {name, type, price, sideDishes} = this.selectedDish;

    //   // this.form.patchValue({ type: this.types.indexOf(type), sidedish1: this.sideDishes.indexOf(sideDishes[0]), sidedish2: sideDishes[2] })
    // });

    // this.ss.subjectCNEdit.subscribe(res => {
    //   this.form = this.fb.group({
    //     name: ['', Validators.required],
    //     type: ['', Validators.required],
    //     price: ['', Validators.required]
    //   });

    //   const {name, type, price} = this.selectedDish;

    //   this.form.patchValue({type: this.types.indexOf(type), name: name, price: price});

    //   this.files[1] = res;
    // });
  }


  buscarSideDish(id: string): string {
    const sideDish = this.sideDishes.find(sideDish => sideDish.id === id);
    return sideDish ? sideDish.thumbnailPlatoArriba : '';
  }

  buscarSideDishDoble(id: string): string {
    const sideDish = this.sideDishes.find(sideDish => sideDish.id === id);
    return sideDish ? sideDish.thumbnailPlatoDoble : '';
  }

  reset() {
    this.form.reset();
    this.files[0] = null;
    this.files[1] = null;
    this.selectedDish = null;
  }

}
