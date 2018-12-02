import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnotifyService } from 'ng-snotify';

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
    private snotifyService: SnotifyService
    ) { 
    this.usersCollection = this.afs.collection('users', ref => ref.orderBy('firstName', 'asc'));
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
            this.snotifyService.success('You have succesfully registered', 'Register', {
              timeout: 2000,
              showProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              position: 'leftBottom'
            });
          })
        )
        .catch(err => {
          this.snotifyService.error(err.message, 'Error', {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: 'leftBottom'
          });
        });
    });
  }

  updateUser(user: User) {
    this.userDoc = this.afs.doc<User>(`users/${user.uid}`);
    this.userDoc.update(user);
  }

  getUserById(id: string) {
    // Get user with the ID
    this.userDoc = this.afs.doc<User>(`users/${id}`);

    const foundUser = this.userDoc.snapshotChanges().pipe(
      map(a => {
        if (a.payload.exists === false) {
          return null;
        } else {
          const user = a.payload.data();
          user.uid = a.payload.id;
          return user;
        }
      })
    );

    return foundUser;
  }
}
