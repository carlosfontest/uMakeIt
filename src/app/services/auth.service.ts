import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from, NEVER } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    ) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afa.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  getAuth() {
    return this.afa.authState;
  }

  logout() {
    this.afa.auth.signOut();
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afa.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  getCurrentUser(): Observable<any> {
    return this.afa.authState.pipe(
      mergeMap(authState => {
        if (authState) {
          console.log(from(this.afs.doc(`users/${authState.uid}`).get()));
          return from(this.afs.doc(`users/${authState.uid}`).get());
        } else {
          return NEVER;
        }
      })
    );
  }
}
