import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (regex.test(control.value)) {
      return null;
    }
    return error;
  };
}
