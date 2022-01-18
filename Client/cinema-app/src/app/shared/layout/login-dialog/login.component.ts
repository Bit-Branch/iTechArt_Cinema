import { AuthService } from '@core/services/auth.service';
import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { $animations } from './login-animations';
import {$pages} from './login-pages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: $animations
})
export class LoginComponent{

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });

  pages = $pages;

  page: string;

  error: string;
  progress: boolean;
  hidePassword: boolean;

  constructor(private ref: MatDialogRef<LoginComponent>, 
              private authService: AuthService,
              private formBuilder: FormBuilder) { 

    this.error = '';
    this.progress = false;
    this.hidePassword = true;

    this.page = 'login';

    this.switchPage(this.page);
  }

  get currentPage(): any { 
    return this.pages[this.page]; 
  }

  public switchPage(page: string): void {
    switch(this.page = page) {

      case 'register':
      this.form.controls["confirmPassword"].enable();
      break;

      case 'login':
        this.form.controls["confirmPassword"].disable();
      break;
    }
  }

  private showError(error: string): void {

    this.error = error;
    this.progress = false;
    setTimeout(() => this.error = '', 5000);
  }

  public activate(action: string): void {
    
    switch(action) {

      case 'login':
      this.login( this.form.controls['email'].value, this.form.controls['password'].value);
      break;

      case 'register':
      this.register( this.form.controls['email'].value, this.form.controls['password'].value);
      break;
    }
  }

  private register(email: string, password: string): void {
      this.authService.register(email, password)
          .subscribe(
            () => {
              this.ref.close();
            },
            err => this.showError(err.code)
          );
  }

  private login(email: string, password: string): void {
      this.authService.login(email, password)
          .subscribe(
            () => {
              this.ref.close();
            },
            err => this.showError(err.code)
          );
  }

}
