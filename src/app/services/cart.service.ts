import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Cart } from './../models/Cart';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCollection: AngularFirestoreCollection<Cart>;
  cartDoc: AngularFirestoreDocument<Cart>;
  deleteCartSubject: Subject<boolean>;

  constructor(private afs: AngularFirestore, private as: AuthService) { 
    this.cartCollection = this.afs.collection('carts');
    this.deleteCartSubject = new Subject();
  }

  getCart(uid: string)  {
    this.cartDoc = this.afs.doc<Cart>(`carts/${uid}`);
    
    return this.cartDoc.snapshotChanges().pipe(
      map(a => {
        if (a.payload.exists === false) {
          return null;
        } else {
          const dish = a.payload.data();
          return dish;
        }
      }));
  }

  createCart(uid: string, cart: Cart) {
    this.cartDoc = this.afs.doc<Cart>(`carts/${uid}`);
    
    return this.cartDoc.set(cart);
  }

  getCartDoc(uid: string) {
    return this.afs.doc<Cart>(`carts/${uid}`);
  }

  deleteCart(id: string) {
    this.deleteCartSubject.next(true);
    this.cartDoc = this.afs.doc<Cart>(`carts/${id}`);
    this.cartDoc.delete();
  }


  
}
