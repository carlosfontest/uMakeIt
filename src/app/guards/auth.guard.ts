import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  canActivate(): Observable<boolean> {
    // Verificamos el estado de la sesión, si hay alguien loggeado puede acceder, sino, lo redirige a home
    return this.afAuth.authState.pipe(map(auth => {
      if (!auth) {
        this.router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
    }));
  }

}
