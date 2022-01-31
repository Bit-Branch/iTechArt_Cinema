import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName)?.value;
    const matchingControl = formGroup.get(matchingControlName)?.value;
    if (control.value !== matchingControl?.value) {
      return { passwordsIsNotMatch: true };
    }
    return null;
  };
}
