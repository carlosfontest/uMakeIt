import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  emailUserLoggedIn: string;
  nameUserLoggedIn: string;
  isAdmin: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // Verificamos si hay un user loggeado para que no se muestre el nombre si no hay nadie loggeado
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.emailUserLoggedIn = auth.email;
        this.getUserInfo(auth.email); // Obtenemos el nombre y el boolean isAdmin del user actual
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogoutClick() {
    // Hacemos logout al user actual
    this.authService.logout();
    location.reload();
  }

  getUserInfo(email: string) {
    this.userService.getUsers().subscribe(users => {
      for (const user of users) {
        if (user.email === email) {
          this.nameUserLoggedIn = `${user.firstName} ${user.lastName}`;
          this.isAdmin = user.isAdmin;
        }
      }
    });
  }

}
