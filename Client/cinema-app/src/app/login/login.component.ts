//Angular components
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

//Local components
import { AuthService } from '@core/services/auth.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { noWhiteSpaceValidator } from '@shared/validators/noWhiteSpaceValidator';
import { passwordsMatchValidator } from '@shared/validators/passwords-match-validator';
import { animations } from './login-animations';
import { loginPageMessages, AuthenticationPages } from './login-page-messages';

const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
const emailControl = 'email';
const passwordControl = 'password';
const confirmPasswordControl = 'confirmPassword';
const registerPage = 'register';
const loginPage = 'login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: animations
})
export class LoginComponent {
  error = '';
  hidePassword = true;
  page: AuthenticationPages = loginPage;
  form: FormGroup;

  constructor(
    private readonly ref: MatDialogRef<LoginComponent>,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly snackbarService: SnackbarService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          noWhiteSpaceValidator(),
          Validators.pattern(pattern)
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          noWhiteSpaceValidator(),
          Validators.pattern(pattern)
        ]
      ]
    }, {
      validators: []
    });
    this.form.get(confirmPasswordControl)
      ?.setValidators(passwordsMatchValidator(this.form.get(passwordControl)));
    this.switchPage(this.page);

    setInterval(() => console.log(this.form.get(passwordControl)?.errors), 2000);
  }

  get currentPageContent(): { title: string, message: string, caption: string } {
    return loginPageMessages[this.page];
  }

  switchPage(page: AuthenticationPages): void {
    switch (this.page = page) {
      case registerPage:
        this.form.get(confirmPasswordControl)?.enable();
        break;

      case loginPage:
        this.form.get(confirmPasswordControl)?.disable();
        break;
    }
  }

  activate(action: AuthenticationPages): void {
    switch (action) {
      case loginPage:
        this.login(this.form.get(emailControl)?.value, this.form.get(passwordControl)?.value);
        break;

      case registerPage:
        this.register(this.form.get(emailControl)?.value, this.form.get(passwordControl)?.value);
        break;
    }
  }

  get registerPage(): AuthenticationPages {
    return registerPage;
  }

  get loginPage(): AuthenticationPages {
    return loginPage;
  }

  get emailControl(): string {
    return emailControl;
  }

  get passwordControl(): string {
    return passwordControl;
  }

  get confirmPasswordControl(): string {
    return confirmPasswordControl;
  }

  private register(email: string, password: string): void {
    this.authService.register(email, password)
      .subscribe(
        {
          next: (response: string) => {
            this.showRegisteredMessage(response);
          },
          error: (error: HttpErrorResponse) => {
            this.showError(error.error);
          },
          complete: () => {
            this.ref.close();
          }
        }
      );
  }

  private login(email: string, password: string): void {
    this.authService.login(email, password)
      .subscribe(
        {
          error: (error: HttpErrorResponse) => {
            this.showError(error.error);
          },
          complete: () => {
            this.ref.close();
          }
        }
      );
  }

  private showError(error: string) {
    this.error = error;
    setTimeout(() => this.error = '', 5000);
  }

  private showRegisteredMessage(message: string) {
    this.snackbarService.showSuccessSnackBar(message);
  }
}
