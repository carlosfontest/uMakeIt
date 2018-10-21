import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from './../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private afs: AngularFirestore, private router: Router, private us: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> |  boolean {
      return new Observable((observer) => {
        this.auth.user$.subscribe(p => {
          this.afs.collection('users').doc(p.uid).valueChanges().subscribe((user: User) => {
            let operation;
            user.isAdmin? operation = observer.next(true) : this.router.navigate(['/dashboard']); operation = observer.next(false);
            return operation;
          })
        })
      })
      
  }
}
