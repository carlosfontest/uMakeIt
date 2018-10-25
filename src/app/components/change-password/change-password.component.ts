import { Component, OnInit, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('submit') submit;
  formNew: FormGroup;
  formOld: FormGroup;
  credentials: boolean;
  boolConfirm: boolean;
  done: boolean;

  constructor(private as: AuthService, private fb: FormBuilder, private renderer: Renderer2, private router: Router) { }

  ngOnInit() {
    this.done = false;
    this.credentials = false;
    this.boolConfirm = true;

    this.formOld = this.fb.group({
      current: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.formNew = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required]]
    });

    this.formNew.valueChanges.subscribe(() => {
      if(!this.boolConfirm){
        this.renderer.removeClass(this.submit.nativeElement,'btn-danger');
        this.renderer.addClass(this.submit.nativeElement,'btn-secondary');
        this.submit.nativeElement.innerText = 'Submit';
        this.boolConfirm = true;
      }
    });
  }

  reAuth({value}){
    console.log('pero si entro xd, hay un...');
    
    if(value.length < 5){
      console.log('error xd');
      return;
    }

    this.as.reAuth(value).then(() => {
      this.credentials = true;
    }).catch(function(error) {
      console.log(error);
    });
  }

  changePassword({value}){
    if(!(value.length >= 6)){
      return;
    }

    if(this.boolConfirm){
      const {nativeElement: boton} = this.submit;
      this.renderer.removeClass(boton,'btn-secondary');
      this.renderer.addClass(boton,'btn-danger');
      boton.innerText = 'Are you Sure?';
      this.boolConfirm = false;
      return;
    }

    this.renderer.removeClass(this.submit.nativeElement,'btn-danger');
    this.renderer.addClass(this.submit.nativeElement,'btn-secondary');
    this.submit.nativeElement.innerText = 'Submitted';

    this.as.changePassword(value).then(() => {
      this.done = true;
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1500);
    }).catch(function(error) {
      console.log(error);
    });
  }

  get password() {
    return this.formNew.get('password');
  }

  get confirm() {
    return this.formNew.get('confirm');
  }

  get current() {
    return this.formOld.get('current');
  }
  

}
