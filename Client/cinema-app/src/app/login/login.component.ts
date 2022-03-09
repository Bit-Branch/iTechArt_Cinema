//Angular components
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

//Local components
import { AuthService } from '@core/services/auth.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { AuthenticationRequest } from '@core/models/authentication/authentication-request';
import { RegistrationRequest } from '@core/models/registration/registration-request';
import { regexValidator } from '@core/validators/regex-validator';
import { noWhitespaceValidator } from '@shared/../core/validators/no-whitespace-validator';
import { matchValidator } from '@core/validators/match-validator';
import { ValidationPatterns } from '@core/constants/validation-patterns';
import { animations } from './login-animations';
import { loginPageMessages, LoginPageKeys, LoginPageElements } from './login-page-messages';

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
  readonly form: FormGroup;
  hidePassword = true;
  page: LoginPageKeys = loginPage;
  error = '';

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly snackbarService: SnackbarService,
    private readonly ref: MatDialogRef<LoginComponent>
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
            regexValidator(
              ValidationPatterns.HAS_ONE_OR_MORE_LOWERCASE_CHARACTERS_PATTERN,
              { noLowerCase: true }
            ),
            regexValidator(
              ValidationPatterns.HAS_ONE_OR_MORE_UPPERCASE_CHARACTERS_PATTERN,
              { noUpperCase: true }
            ),
            regexValidator(
              ValidationPatterns.HAS_ONE_OR_MORE_NUMBERS_PATTERN,
              { noNumbers: true }
            )
          ]
        ],
        [confirmPasswordControl]: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            noWhitespaceValidator(),
            regexValidator(
              ValidationPatterns.HAS_ONE_OR_MORE_LOWERCASE_CHARACTERS_PATTERN,
              { noLowerCase: true }
            ),
            regexValidator(
              ValidationPatterns.HAS_ONE_OR_MORE_UPPERCASE_CHARACTERS_PATTERN,
              { noUpperCase: true }
            ),
            regexValidator(
              ValidationPatterns.HAS_ONE_OR_MORE_NUMBERS_PATTERN,
              { noNumbers: true }
            )
          ]
        ]
      },
      {
        validators: [
          matchValidator(passwordControl, confirmPasswordControl)
        ]
      }
    );
    this.switchPage(this.page);
  }

  get currentPageContent(): LoginPageElements {
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
        this.login(this.form.value as AuthenticationRequest);
        break;

      case registerPage:
        this.register(this.form.value as RegistrationRequest);
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

  private register(registrationRequest: RegistrationRequest): void {
    this.authService.register(registrationRequest)
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

  private login(authRequest: AuthenticationRequest): void {
    this.authService.login(authRequest)
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
