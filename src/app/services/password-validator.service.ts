import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {

  constructor() { }

  checkValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control?.parent?.value) {
        const { password } = control?.parent?.value;
        const repeatPassword = control.value;
        const equal = password !== '' && password === repeatPassword;
        return !equal ? { notEqual: true } : null;
      }
      return null;
    };
  }
}
