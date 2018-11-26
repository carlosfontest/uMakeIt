import { Injectable } from '@angular/core';
import { Order } from '../models/Order';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  purchasesCollection: AngularFirestoreCollection<Order>;
  purchaseDoc: AngularFirestoreDocument<Order>;
  purchases: Observable<Order[]>;
  purchase: Observable<Order>;

  constructor(private afs: AngularFirestore) { 
    this.purchasesCollection = this.afs.collection('orders');
  }

  getOrders(): Observable<Order[]> {
    // Get orders with the ID
    this.purchases = this.purchasesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const order = a.payload.doc.data() as Order;
        order.id = a.payload.doc.id;
        return order;
      }))
    );

    return this.purchases;
  }

  getOrderById(id: string) {
    // Get order with the ID
    this.purchaseDoc = this.afs.doc<Order>(`orders/${id}`);

    const foundOrder = this.purchaseDoc.snapshotChanges().pipe(
      map(a => {
        if (a.payload.exists === false) {
          return null;
        } else {
          const order = a.payload.data();
          order.id = a.payload.id;
          return order;
        }
      })
    );

    return foundOrder;
  }
}
