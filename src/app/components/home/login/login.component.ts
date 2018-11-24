import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { RecoverPasswordModalComponent } from '../../shared/modals/recover-password-modal/recover-password-modal.component';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  bsModalRef: BsModalRef;
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snotifyService: SnotifyService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    // Loggeamos al user, redirigimos al dashboard y mostramos el mensaje de loggeo satisfactorio
    this.authService.login(this.email, this.password)
      .then(res => {
        this.router.navigate(['/']);
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
  }

  recoverPasswordModal() {
    const initialState = {
      title: 'Recover your Password'
    };
    this.bsModalRef = this.modalService.show(RecoverPasswordModalComponent, {initialState});
  }

}
