import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  @ViewChild('submit') submit;
  form: FormGroup;
  code: string;
  boolConfirm: boolean;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private flashMessage: FlashMessagesService, 
    private renderer: Renderer2,
    private as: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.code = params.oobCode;
      if(!this.code){
        this.router.navigate(['**']);
      }
    });
    
    this.boolConfirm = true;

    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.form.valueChanges.subscribe(() => {
      if(!this.boolConfirm){
        const {nativeElement: boton} = this.submit;
        this.renderer.removeClass(boton, 'btn-danger');
        this.renderer.addClass(boton, 'btn-secondary');
        this.renderer.setProperty(boton,'value', 'Submit');
        this.boolConfirm = true;
      }
    });
  }

  changePassword({value}){
    if(!(value.length >= 6)){
      this.flashMessage.show('The password minimum length should be 6', {
        cssClass: 'alert-danger', timeout: 4000
      });
      return;
    }

    const {nativeElement: boton} = this.submit;

    if(this.boolConfirm){
      this.renderer.removeClass(boton,'btn-secondary');
      this.renderer.addClass(boton,'btn-danger');
      this.renderer.setProperty(boton,'value','Are you Sure?');
      this.boolConfirm = false;
      return;
    }

    this.renderer.removeClass(boton, 'btn-danger');
    this.renderer.addClass(boton, 'btn-secondary');
    this.renderer.setProperty(boton,'value', 'Submitted');

    this.as.recoverPassword(this.code, value).then(() => {
      this.password.disable;
      this.confirm.disable;
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1500);
    }).catch(error => {
      this.flashMessage.show(error.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }

  get password(){
    return this.form.get('password');
  }

  get confirm(){
    return this.form.get('confirm');
  }

}
