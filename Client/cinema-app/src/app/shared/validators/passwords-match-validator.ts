import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);
    if (matchingControl?.enabled && (control?.value !== matchingControl?.value)) {
      return { passwordsIsNotMatch: true };
    }
    return null;
  };
}
