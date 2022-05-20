import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function yearValidator(minYear: number, maxYear: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const yearValue = control.value as number;
    if (yearValue) {
      if (yearValue < minYear || yearValue > maxYear) {
        return { invalidYear: { minYear, maxYear } };
      }
    }
    return null;
  };
}
