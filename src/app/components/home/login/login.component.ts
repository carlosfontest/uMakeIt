import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { RecoverPasswordModalComponent } from '../../shared/modals/recover-password-modal/recover-password-modal.component';

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
    private flashMessage: FlashMessagesService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    // Loggeamos al user, redirigimos al dashboard y mostramos el mensaje de loggeo satisfactorio
    this.authService.login(this.email, this.password)
      .then(res => {
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success', timeout: 2000
        });
        this.router.navigate(['/']);
      })
        .catch(err => {
          this.flashMessage.show(err.message, {
            cssClass: 'alert-danger', timeout: 2000
          });
        });
  }

  recoverPasswordModal(){
    const initialState = {
      title: 'Recover your Password'
    };
    this.bsModalRef = this.modalService.show(RecoverPasswordModalComponent, {initialState});
  }

}
