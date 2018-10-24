import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;
  users: Observable<User[]>;
  user: Observable<User>;

  constructor(
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    private flashMessage: FlashMessagesService
    ) { 
    this.usersCollection = this.afs.collection('users', ref => ref.orderBy('lastName', 'asc'));
  }

  // Método para obtener todos los users del collection
  getUsers(): Observable<User[]> {
    // Obtenemos los users de la collection de firebase
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const user = a.payload.doc.data() as User;
        user.uid = a.payload.doc.id;
        return user;
      }))
    );

    return this.users;
  }

  // Método para añadir un nuevo user al collection
  newUser(user: User) {
    this.usersCollection.add(user);
  }

  // Método para registrar un usuario al sistema
  register(newUser: User, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afa.auth.createUserWithEmailAndPassword(email, password)
        .then(credential =>
          this.afs.doc(`users/${credential.user.uid}`).set(newUser).then(success => {
            this.flashMessage.show('You have succesfully registered', {
              cssClass: 'alert-success', timeout: 4000
            });
          })
        )
        .catch(err => {
          this.flashMessage.show(err.message, {
            cssClass: 'alert-danger', timeout: 4000
          });
        });
    });
  }
}
