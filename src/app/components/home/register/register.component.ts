import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // Ninguno de los usuarios registrados mediante interfaz será admin
    this.isAdmin = false;
  }

  onSubmit() {
    // Registramos al user, lo guardamos en el collection de users, 
    // redirigimos al dashboard y mostramos el mensaje de registro satisfactorio
    this.authService.register(this.email, this.password)
      .then(res => {
        this.flashMessage.show('You are now registered and logged in', {
          cssClass: 'alert-success', timeout: 4000
        });
        // Creamos el nuevo usuario y lo subimos a firestore
        this.userService.newUser({
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          isAdmin: this.isAdmin
        });
        this.router.navigate(['/']);
      })
        .catch(err => {
          this.flashMessage.show(err.message, {
            cssClass: 'alert-danger', timeout: 4000
          });
        });
  }

}
