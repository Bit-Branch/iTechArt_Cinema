//Angular components
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

//Local components
import { AuthService } from '@core/services/auth.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { noWhitespaceValidator } from '@shared/../core/validators/no-whitespace-validator';
import { passwordsMatchValidator } from '@shared/../core/validators/passwords-match-validator';
import { ValidationPatterns } from '@core/constants/validation-patterns';
import { animations } from './login-animations';
import { loginPageMessages, LoginPageKeys, LoginPageObject } from './login-page-messages';

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
  page: LoginPageKeys = loginPage;
  form: FormGroup;

  constructor(
    private readonly ref: MatDialogRef<LoginComponent>,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly snackbarService: SnackbarService
  ) {
    this.form = this.formBuilder.group(
      {
        [emailControl]: ['', [Validators.required, Validators.email]],
        [passwordControl]: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            noWhitespaceValidator(),
            Validators.pattern(ValidationPatterns.PASSWORD_PATTERN)
          ]
        ],
        [confirmPasswordControl]: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            noWhitespaceValidator(),
            Validators.pattern(ValidationPatterns.PASSWORD_PATTERN)
          ]
        ]
      },
      {
        validators: [
          passwordsMatchValidator(passwordControl, confirmPasswordControl)
        ]
      }
    );
    this.switchPage(this.page);
  }

  get currentPageContent(): LoginPageObject {
    return loginPageMessages[this.page];
  }

  switchPage(page: LoginPageKeys): void {
    switch (this.page = page) {
      case registerPage:
        this.form.get(confirmPasswordControl)?.enable();
        break;

      case loginPage:
        this.form.get(confirmPasswordControl)?.disable();
        break;
    }
  }

  activate(action: LoginPageKeys): void {
    switch (action) {
      case loginPage:
        this.login(this.form.get(emailControl)?.value, this.form.get(passwordControl)?.value);
        break;

      case registerPage:
        this.register(
          this.form.get(emailControl)?.value,
          this.form.get(passwordControl)?.value,
          this.form.get(confirmPasswordControl)?.value
        );
        break;
    }
  }

  get registerPage(): LoginPageKeys {
    return registerPage;
  }

  get loginPage(): LoginPageKeys {
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

  private register(email: string, password: string, confirmPassword: string): void {
    this.authService.register(email, password, confirmPassword)
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

  private showError(error: string): void {
    this.error = error;
    setTimeout(() => this.error = '', 5000);
  }

  private showRegisteredMessage(message: string): void {
    this.snackbarService.showSuccessSnackBar(message);
  }
}
