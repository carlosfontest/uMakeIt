import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DishService } from 'src/app/services/dish.service';
import { StorageService } from 'src/app/services/storage.service';
import * as firebase from 'firebase'; 
import { SideDish } from 'src/app/models/SideDish';
import { SideDishService } from 'src/app/services/side-dish.service';
import { Dish } from 'src/app/models/Dish';

@Component({
  selector: 'app-add-editable-product',
  templateUrl: './add-editable-product.component.html',
  styleUrls: ['./add-editable-product.component.scss']
})
export class AddEditableProductComponent implements OnInit {
  form: FormGroup;
  file: File;
  types: string[];
  sideDishes: SideDish[];
  fileR: File;

  constructor(private fb: FormBuilder,
    private ss: StorageService,
    private ds: DishService,
    private sds: SideDishService) { }

  ngOnInit() {
    // Cargamos todos los Side-Dishes
    this.sideDishes = [];

    this.sds.getSideDishes().subscribe(data => {
      this.sideDishes = data;
      console.log(data);
      
    });

    this.types = ['Pizzas', 'Fishes', 'Soups', 'Pastas', 'Others'];

    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      sidedish1: ['', Validators.required],
      sidedish2: ['', Validators.required]
    });

    this.form.patchValue({ type: 'Choose type of Product' , sidedish1: 'Choose 1° Side-Dish', sidedish2: 'Choose 2° Side-Dish'});

    this.ss.subjectCedit.subscribe(res => {
      this.file = res;
    });

    this.ss.subjectCRedit.subscribe(res => {
      this.fileR = res;
    });
  }

  uploadFile() {
    console.log('uploading...');

    const dish: Dish = {name: this.name, price: this.price, sideDishes: [
      this.sideDish1, this.sideDish2
    ], type: this.types[this.type] };

    this.ss.uploadEditable(this.file, this.fileR, dish);

    // Snackbar de upload
    
    this.reset();
  }
  
  reset() {
    this.form.reset();
    this.form.patchValue({ type: 'Choose type of Product' , sidedish1: 'Choose default sidedish 1', sidedish2: 'Choose default sidedish 2'});
    this.file = null;
  }

  get name() {
    return this.form.get('name').value;
  }

  get type() {
    return this.form.get('type').value;
  }

  get price() {
    return this.form.get('price').value;
  }

  get sideDish1() {
    return this.form.get('sidedish1').value;
  }

  get sideDish2() {
    return this.form.get('sidedish2').value;
  }

  get disableFlag() {
    return (this.form.invalid || !this.file);
  }

}
