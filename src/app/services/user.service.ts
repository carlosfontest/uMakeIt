import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;
  users: Observable<User[]>;
  user: Observable<User>;

  constructor(private afs: AngularFirestore) { 
    this.usersCollection = this.afs.collection('users', ref => ref.orderBy('lastName', 'asc'));
  }

  // Método para obtener todos los users del collection
  getUsers(): Observable<User[]> {
    // Obtenemos los users de la collection de firebase
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const user = a.payload.doc.data() as User;
        user.id = a.payload.doc.id;
        return user;
      }))
    );

    return this.users;
  }

  // Método para añadir un nuevo user al collection
  newUser(user: User) {
    this.usersCollection.add(user);
  }
  
}
