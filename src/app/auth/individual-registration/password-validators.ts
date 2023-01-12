import { AbstractControl, ValidatorFn } from '@angular/forms';

export class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
       
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}