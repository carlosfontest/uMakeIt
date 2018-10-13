import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { decode } from 'jwt-decode';


@Injectable()
export class AdminGuard implements CanActivate {
  users: User[];

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private userService: UserService
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      map(user => {
        if (!user || !user.isAdmin) {
          console.log(user);
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }),
      take(1)
    );
  }


}
