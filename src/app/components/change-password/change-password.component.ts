import { Component, OnInit, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

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

  constructor(
    private as: AuthService, 
    private fb: FormBuilder, 
    private renderer: Renderer2, 
    private router: Router, 
    private snotifyService: SnotifyService
    ) { }

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
      if (!this.boolConfirm) {
        const {nativeElement: boton} = this.submit;
        this.renderer.removeClass(boton, 'btn-danger');
        this.renderer.addClass(boton, 'btn-secondary');
        this.renderer.setProperty(boton, 'value', 'Submit');
        this.boolConfirm = true;
      }
    });

    console.log(this.as.currentUser);
    
  }

  reAuth({value}) {
    
    if (!(value.length >= 6)) {
      this.snotifyService.error('The password minimum length should be 6', 'Error', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'leftBottom'
      });
      return;
    }

    this.as.reAuth(value).then(() => {
      this.credentials = true;
    }).catch(error => {
      this.snotifyService.error(error.message, 'Error', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'leftBottom'
      });
    });
  }

  changePassword({value}) {
    if (!(value.length >= 6)) {
      this.snotifyService.error('The password minimum length should be 6', 'Error', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'leftBottom'
      });
      return;
    }

    const {nativeElement: boton} = this.submit;

    if (this.boolConfirm) {
      this.renderer.removeClass(boton, 'btn-secondary');
      this.renderer.addClass(boton, 'btn-danger');
      this.renderer.setProperty(boton, 'value', 'Are you Sure?');
      this.boolConfirm = false;
      return;
    }

    this.renderer.removeClass(boton, 'btn-danger');
    this.renderer.addClass(boton, 'btn-secondary');
    this.renderer.setProperty(boton, 'value', 'Submitted');

    this.as.changePassword(value).then(() => {
      this.password.disable();
      this.confirm.disable();
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
        this.snotifyService.success('The password has been successfully changed', 'Change Password', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          position: 'leftBottom'
        });
      }, 1500);
    }).catch(error => {
      this.snotifyService.error(error.message, 'Error', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'leftBottom'
      });
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
