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

  constructor(private afs: AngularFirestore) { 
    this.dishesCollection = this.afs.collection('dishes', ref => ref.orderBy('name', 'asc'));
  }

  getDishes(): Observable<Dish[]> {
    // Get dishes with the ID
    const dishes = this.dishesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const dish = a.payload.doc.data() as Dish;
        dish.id = a.payload.doc.id;
        return dish;
      }))
    );

    return dishes;
  }

  getDishById(id: string) {
    // Get dish with the ID
    this.dishDoc = this.afs.doc<Dish>(`dishes/${id}`);

    const foundDish = this.dishDoc.snapshotChanges().pipe(
      map(a => {
        if (a.payload.exists === false) {
          return null;
        } else {
          const dish = a.payload.data();
          dish.id = a.payload.id;
          return dish;
        }
      })
    );

    return foundDish;
  }

  createDish(dish: Dish) {
    this.dishesCollection.add(dish);
  }

  updateDish(dish: Dish, id: string): any {
    this.afs.doc<Dish>(`dishes/${id}`).update(dish);
  }
}
