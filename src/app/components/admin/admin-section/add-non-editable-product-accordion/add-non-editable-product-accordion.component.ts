import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { DishService } from 'src/app/services/dish.service';
import { Dish } from './../../../../models/Dish';

@Component({
  selector: 'app-add-non-editable-product-accordion',
  templateUrl: './add-non-editable-product-accordion.component.html',
  styleUrls: ['./add-non-editable-product-accordion.component.scss']
})
export class AddNonEditableProductComponent implements OnInit {
  form: FormGroup;
  file: File;
  types: string[];

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

    this.ss.subjectEdit.subscribe(res => {
      this.file = res;
    });
  }

  uploadFile() {
    console.log('uploading...');

    const storageRef = firebase.storage().ref();

    storageRef.child(`platos/noEditables/${this.file.name}`).put(this.file).then(snapshot => {
      snapshot.ref.getDownloadURL().then(link => {
        const dish = {} as Dish;
        dish.name = this.name;
        dish.price = this.price;
        dish.thumbnail = link;
        dish.type = this.types[this.type];
        this.ds.createNonEditableDish(dish);
        console.log(dish);
        
      })
    });
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
