import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  recoverPassword(){
    const {value} = this.email;
    this.authService.passwordResetEmail(value).then(() => {
      this.flashMessage.show('Email has been sent. Check your inbox!', {
        cssClass: 'alert-success', timeout: 3000
      });
      this.bsModalRef.hide();
    }).catch((error)=>{
      this.flashMessage.show(error.message, {
        cssClass: 'alert-danger', timeout: 3000
      });
    });
  }

  get email(){
    return this.form.get('email');
  }

}
