import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  authState = null;

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    ) {
      this.user$ = this.afa.authState;
      this.user$.subscribe((user: User) => {
        if (user) {
          this.authState = user;
          this.afs.collection('users').doc(user.uid).valueChanges().subscribe((userInfo: User) => {
            if (userInfo) {
              this.authState = userInfo;
            }
          });
        }
      });
    }

  // Método para logear al user al sistema
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afa.auth.signInWithEmailAndPassword(email, password)
        .then(userData =>
          resolve(userData), err => reject(err));
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

  changePassword(password: string){
    const user = this.afa.auth.currentUser;
    const newPassword = password;

    return user.updatePassword(newPassword);
  }

  reAuth(password: string){
    const user = this.afa.auth.currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password);
    
    return user.reauthenticateAndRetrieveDataWithCredential(credentials);
  }

  passwordResetEmail(email: string){
    return this.afa.auth.sendPasswordResetEmail(email);
  }

  recoverPassword(code: string, newPassword: string){
    return this.afa.auth.confirmPasswordReset(code, newPassword);
  }

  get currentUser(){
    return this.afa.auth.currentUser;
  }
}
