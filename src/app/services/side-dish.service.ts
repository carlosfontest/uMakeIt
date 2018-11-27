import { Injectable } from '@angular/core';
import { SideDish } from '../models/SideDish';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SideDishService {
  sideDishesCollection: AngularFirestoreCollection<SideDish>;
  sideDishDoc: AngularFirestoreDocument<SideDish>;
  sideDishes: Observable<SideDish[]>;
  sideDish: Observable<SideDish>;

  constructor(private afs: AngularFirestore) {
    this.sideDishesCollection = this.afs.collection('sideDishes');
  }

  getSideDishes(): Observable<SideDish[]> {
    // Get side dishes with the ID
    this.sideDishes = this.sideDishesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const dish = a.payload.doc.data() as SideDish;
        dish.id = a.payload.doc.id;
        return dish;
      }))
    );

    return this.sideDishes;
  }

  getSideDishById(id: string) {
    // Get dish with the ID
    this.sideDishDoc = this.afs.doc<SideDish>(`sideDishes/${id}`);

    const foundSideDish = this.sideDishDoc.snapshotChanges().pipe(
      map(a => {
        if (a.payload.exists === false) {
          return null;
        } else {
          const sideDish = a.payload.data();
          sideDish.id = a.payload.id;
          return sideDish;
        }
      })
    );

    return foundSideDish;
  }

  createSideDish(sideDish: SideDish){
    this.sideDishesCollection.add(sideDish);
  }

  
  updateSideDish(sideDish: SideDish, id: string): any {
    this.afs.doc<SideDish>(`sideDishes/${id}`).update(sideDish);
  }
}
