import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
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
    private notifierService: NotifierService
  ) { }

  ngOnInit() {
    // Ninguno de los usuarios registrados mediante interfaz será admin
    this.isAdmin = false;
  }

  onSubmit() {
      this.userService.register({
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          isAdmin: this.isAdmin
        }, this.email, this.password).catch(err => {
          this.notifierService.notify('error', err);
        });
      this.router.navigate(['/']);
  }

}
