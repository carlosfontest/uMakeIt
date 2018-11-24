import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-recover-password-modal',
  templateUrl: './recover-password-modal.component.html',
  styleUrls: ['./recover-password-modal.component.scss']
})

export class RecoverPasswordModalComponent implements OnInit {
  title: string;
  form: FormGroup;

  constructor(public bsModalRef: BsModalRef, 
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private snotifyService: SnotifyService
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  recoverPassword() {
    const {value} = this.email;
    this.authService.passwordResetEmail(value).then(() => {
      this.snotifyService.warning('Email has been sent. Check your inbox!', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'leftBottom'
      });
      this.bsModalRef.hide();
    }).catch((error) => {
      this.snotifyService.error(error, {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'leftBottom'
      });
    });
  }

  get email() {
    return this.form.get('email');
  }

}
