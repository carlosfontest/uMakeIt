import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from, NEVER, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    ) { }

  // Método para logear al user al sistema
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afa.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  // Método para obtener la autenticación
  getAuth() {
    return this.afa.authState;
  }

  // Método para hacer logout del sistema
  logout() {
    this.afa.auth.signOut();
  }

  // Método para registrar un usuario al sistema
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afa.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

}
