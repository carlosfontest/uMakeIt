import { Injectable } from '@angular/core';
import { Order } from '../models/Order';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ordersCollection: AngularFirestoreCollection<Order>;
  orderDoc: AngularFirestoreDocument<Order>;
  orders: Observable<Order[]>;
  order: Observable<Order>;

  constructor(private afs: AngularFirestore) { 
    this.ordersCollection = this.afs.collection('orders');
  }

  getOrders(): Observable<Order[]> {
    // Get orders with the ID
    this.orders = this.ordersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const order = a.payload.doc.data() as Order;
        order.id = a.payload.doc.id;
        return order;
      }))
    );

    return this.orders;
  }

  getOrderById(id: string) {
    // Get order with the ID
    this.orderDoc = this.afs.doc<Order>(`orders/${id}`);

    const foundOrder = this.orderDoc.snapshotChanges().pipe(
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

  createOrder(order: Order) {
    this.ordersCollection.add(order);
  }

  updateOrder(order: Order) {
    this.orderDoc = this.afs.doc<Order>(`orders/${order.id}`);
    this.orderDoc.update(order);
  }
}
