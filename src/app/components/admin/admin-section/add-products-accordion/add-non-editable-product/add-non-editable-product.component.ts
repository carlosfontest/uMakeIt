import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { Dish } from '../../../../../models/Dish';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-add-non-editable-product',
  templateUrl: './add-non-editable-product.component.html',
  styleUrls: ['./add-non-editable-product.component.scss']
})
export class AddNonEditableProductComponent implements OnInit, OnDestroy {
  @Output() destroyEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() dish: Dish;
  form: FormGroup;
  file: File;
  types: string[];
  fileR: File;

  constructor(private fb: FormBuilder,
    private ss: StorageService,
    private es: EditService) { }

  ngOnInit() {
    this.types = ['Pizzas', 'Fishes', 'Soups', 'Pastas', 'Others'];


    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required]
    });

    if (this.dish) {
      this.form.patchValue({
        name: this.dish.name,
        type: this.types.indexOf(this.dish.type),
        price: this.dish.price
      });
    } else {
      this.form.patchValue({ type: 'Choose type of Product' });
    }


    this.ss.subjectCNEdit.subscribe(res => {
      this.file = res;
    });

    this.ss.subjectCNREdit.subscribe(res => {
      this.fileR = res;
    });
  }

  ngOnDestroy() {
    this.destroyEvent.emit(true);
  }

  uploadFile() {
    console.log('uploading...');
    const dish = {} as Dish;

    dish.name = this.name;
    dish.price = this.price;
    dish.type = this.types[this.type];

    if (this.dish) {
      this.ss.uploadNoEditable(this.file, this.fileR, dish, this.dish.id);
    } else {
      this.ss.uploadNoEditable(this.file, this.fileR, dish, null);
    }

    // Snackbar de upload

    this.reset();
  }

  reset() {
    this.file = null;
    this.form.reset();
    this.form.patchValue({ type: 'Choose type of Product' });
    this.es.setSelected(null);
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
    return this.dish ? (this.form.invalid && !this.file && !this.fileR) : (this.form.invalid || !this.file || !this.fileR);
  }

  get action(){
    return this.dish? 'Edit' : 'Add';
  }

}
