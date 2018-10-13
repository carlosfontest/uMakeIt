import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // Al inicio obtenemos las credenciales de administrador del user actual
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.getAdminCredentials(auth.email);
      }
    });
  }

  getAdminCredentials(email: string) {
    // Obtenemos todos los users para obtener los datos del user loggeado en esa collection
    this.userService.getUsers().subscribe(users => {
      for (const user of users) {
        if (user.email === email) {
          // Si no es admin se le redirige al dashboard
          if (!user.isAdmin) {
            this.router.navigate(['/dashboard']);
          } 
        }
      }
    });
  }

}
