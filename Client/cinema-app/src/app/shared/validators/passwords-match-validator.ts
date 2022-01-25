import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsMatchValidator(matchingControl: AbstractControl | null): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value !== matchingControl?.value) {
      return { passwordsIsNotMatch: true };
    }
    return null;
  };
}

