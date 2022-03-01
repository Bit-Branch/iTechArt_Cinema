import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    if (!control) {
      console.warn(`No control found with such name: ${controlName}.
      Check the spelling of the name or the existence of such control in the form.`
      );
    }
    const matchingControl = formGroup.get(matchingControlName);
    if (!matchingControl) {
      console.warn(`No control found with such name: ${matchingControlName}.
      Check the spelling of the name or the existence of such control in the form.`
      );
    }
    if (matchingControl?.enabled && (control?.value !== matchingControl?.value)) {
      return { passwordsIsNotMatch: true };
    }
    return null;
  };
}
