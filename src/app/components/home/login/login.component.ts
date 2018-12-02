import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { RecoverPasswordModalComponent } from '../../shared/modals/recover-password-modal/recover-password-modal.component';
import { SnotifyService } from 'ng-snotify';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  bsModalRef: BsModalRef;
  email: string;
  password: string;
  users: User[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private snotifyService: SnotifyService,
    private modalService: BsModalService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.getUsers().pipe(take(1)).subscribe(users => {
      this.users = users;

      // Verificamos si el usuario ha sido baneado
      if (this.users.find(a => a.email === this.email).deleted) {
        this.snotifyService.warning('Your user has been banned', 'User Banned', {
          timeout: 3000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          position: 'leftBottom'
        });
        return;
      }

      // Loggeamos al user, redirigimos al dashboard y mostramos el mensaje de loggeo satisfactorio
      this.authService.login(this.email, this.password)
        .then(res => {
          this.router.navigate(['/']);
          this.snotifyService.success('You have logged in successfully', 'Login', {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: 'leftBottom'
          });
        })
        .catch(err => {
          this.snotifyService.error(err.message, 'Error', {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: 'leftBottom'
          });
        });
    });
  }

  recoverPasswordModal() {
    const initialState = {
      title: 'Recover your Password'
    };
    this.bsModalRef = this.modalService.show(RecoverPasswordModalComponent, { initialState });
  }

}
