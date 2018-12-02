import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private snotifyService: SnotifyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.snotifyService.error('There are empty fields. The max length of the first/last name should be 10 characters', 'Error', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'leftBottom'
      });
      return;
    }

    this.userService.register({
      email: this.email.value,
      firstName: this.capitalize(this.firstName.value),
      lastName: this.capitalize(this.lastName.value),
      isAdmin: false
    }, this.email.value, this.password.value).catch(err => {
      this.snotifyService.error(err.message, 'Error', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'leftBottom'
      });
    });
    this.router.navigate(['/']);
  }

  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  get email() {
    return this.form.get('email');
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get password() {
    return this.form.get('password');
  }

}
