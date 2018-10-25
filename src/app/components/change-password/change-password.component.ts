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

  constructor(private as: AuthService, private fb: FormBuilder, private renderer: Renderer2, private router: Router) { }

  ngOnInit() {
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
        const {nativeElement: boton} = this.submit;
        this.renderer.removeClass(boton, 'btn-danger');
        this.renderer.addClass(boton, 'btn-secondary');
        this.renderer.setProperty(boton,'value', 'Submit');
        this.boolConfirm = true;
      }
    });
  }

  reAuth({value}){
    
    if(value.length < 5){
      return;
    }

    this.as.reAuth(value).then(() => {
      this.credentials = true;
    }).catch(function(error) {
      alert('Wrong password'); // TODO 
    });
  }

  changePassword({value}){
    if(!(value.length >= 6)){
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

    this.as.changePassword(value).then(() => {
      this.password.disable;
      this.confirm.disable;
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
