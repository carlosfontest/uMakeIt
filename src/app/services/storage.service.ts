import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Dish } from '../models/Dish';
import { DishService } from 'src/app/services/dish.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage = firebase.storage().ref();
  subjectEdit: Subject<File> = new Subject();
  subjectNoEdit: Subject<File> = new Subject();

  constructor(private ds: DishService) { }

  uploadFileEvent(event) {
    console.log(event, 'servicio dood');

    if (event.target.id === 'noEditThumbnail') {
      this.subjectNoEdit.next(event.target.files.item(0),);
    } else if (event.target.id === 'editThumbnail'){
      this.subjectEdit.next(event.target.files.item(0),);
    }
  }

  uploadNoEditable(file: File, dish: Dish) {
    this.storage.child(`platos/noEditables/${file.name}`).put(file).then(snapshot => {
      snapshot.ref.getDownloadURL().then(link => {
        dish.thumbnail = link;
        this.ds.createDish(dish);
      });
    });
  }

  uploadEditable(file: File, dish: Dish) {
    this.storage.child(`principal/${file.name}`).put(file).then(snapshot => {
      snapshot.ref.getDownloadURL().then(link => {
        dish.thumbnail = link;
        this.ds.createDish(dish);
      });
    });
  }


}
