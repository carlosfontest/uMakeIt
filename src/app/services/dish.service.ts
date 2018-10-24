import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Dish } from '../models/Dish';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  dishesCollection: AngularFirestoreCollection<Dish>;
  dishDoc: AngularFirestoreDocument<Dish>;
  dishes: Observable<Dish[]>;
  dish: Observable<Dish>;

  constructor(private afs: AngularFirestore) { 
    this.dishesCollection = this.afs.collection('dishes');
  }

  getDishes(): Observable<Dish[]> {
    // Get dishes with the ID
    this.dishes = this.dishesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const dish = a.payload.doc.data() as Dish;
        dish.id = a.payload.doc.id;
        return dish;
      }))
    );

    return this.dishes;
  }
}
