import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private as: AuthService
  ) {}

  canActivate(): Observable<boolean> {
    // Verificamos el estado de la sesión, si hay alguien loggeado puede acceder, sino, lo redirige a home
    return new Observable((observer) => {
      if (this.as.user$) {
        this.as.user$.subscribe (u => {
          if (u) {
            this.afs.collection('users').doc(u.uid).valueChanges().subscribe((p) => {
              if (p) {
                return observer.next(true);
              } else {
                this.as.logout();
                location.reload();
                return observer.next(false);
              }
            });
          } else {
            this.router.navigate(['/home']);
            return observer.next(false);
          }
        });
      } else {
        this.router.navigate(['/home']);
        return observer.next(false);
      }
    });
  }

}
