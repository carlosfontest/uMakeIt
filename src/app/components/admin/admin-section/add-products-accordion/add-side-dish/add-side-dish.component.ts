import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DishService } from 'src/app/services/dish.service';
import { StorageService } from 'src/app/services/storage.service';
import { SideDish } from 'src/app/models/SideDish';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-add-side-dish',
  templateUrl: './add-side-dish.component.html',
  styleUrls: ['./add-side-dish.component.scss']
})
export class AddSideDishComponent implements OnInit, OnDestroy {
  @Output() destroyEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() sideDish: SideDish;
  form: FormGroup;
  fileUp: File;
  fileView: File;
  fileDouble: File;
  types: string[];
  fileR: File;

  constructor(private fb: FormBuilder,
    private ss: StorageService,
    private es: EditService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    if(this.sideDish){
      console.log(this.sideDish);
      
      this.form.patchValue({name: this.sideDish.name});
    }


    this.ss.subjectCSideView.subscribe(res => {
      this.fileView = res;
    });

    this.ss.subjectCSideUp.subscribe(res => {
      this.fileUp = res;
    });

    this.ss.subjectCSideDouble.subscribe(res => {
      this.fileDouble = res;
    });
  }
  
  ngOnDestroy(){
    this.destroyEvent.emit(true);
  }

  uploadFile() {
    console.log('uploading...');
    const sideDish = {} as SideDish;
    sideDish.name = this.name;

    if(this.sideDish){
      this.ss.uploadSideDish(this.fileView, this.fileUp, this.fileDouble, sideDish, this.sideDish.id);
    } else {
      this.ss.uploadSideDish(this.fileView, this.fileUp, this.fileDouble, sideDish, null);
    }

    // Snackbar de upload

    this.reset();
  }

  reset() {
    this.fileView = null;
    this.fileDouble = null;
    this.fileUp = null;
    this.form.reset();
    this.es.setSelected(null);
  }

  get name() {
    return this.form.get('name').value;
  }

  get disableFlag() {
    return this.sideDish? ( this.form.invalid && !this.fileView && !this.fileUp && !this.fileDouble)  : (this.form.invalid || !this.fileView || !this.fileDouble || !this.fileUp);
  }

  get action(){
    return this.sideDish? 'Edit' : 'Add'; 
  }

}
