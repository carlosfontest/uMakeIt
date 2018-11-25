import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { DishService } from 'src/app/services/dish.service';
import { Dish } from '../../../../../models/Dish';

@Component({
  selector: 'app-add-non-editable-product',
  templateUrl: './add-non-editable-product.component.html',
  styleUrls: ['./add-non-editable-product.component.scss']
})
export class AddNonEditableProductComponent implements OnInit {
  form: FormGroup;
  file: File;
  types: string[];
  fileR: File;

  constructor(private fb: FormBuilder,
    private ss: StorageService,
    private ds: DishService) { }

  ngOnInit() {
    this.types = ['Pizzas', 'Fishes', 'Soups', 'Pastas', 'Others'];

    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.form.patchValue({ type: 'Choose type of Product' });

    this.ss.subjectCNEdit.subscribe(res => {
      this.file = res;
    });

    this.ss.subjectCNREdit.subscribe(res => {
      this.fileR = res;
    });
  }

  uploadFile() {
    console.log('uploading...');
    const dish = {} as Dish;

    dish.name = this.name;
    dish.price = this.price;
    dish.type = this.types[this.type];

    this.ss.uploadNoEditable(this.file, this.fileR, dish);

    // Snackbar de upload

    this.reset();
  }

  reset() {
    this.file = null;
    this.form.reset();
    this.form.patchValue({ type: 'Choose type of Product' });
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

  get disableFlag() {
    return (this.form.invalid || !this.file);
  }

}
