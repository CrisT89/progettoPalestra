import { DialogService } from './../../services/dialog.service';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changeForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthService,
  ) { }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: this.MustMatch('newPassword', 'confirmPassword')
      });
  }

  // Custom validator per match di 2 campi
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      //Se ci sono già errori non c'è bisogno di controllare altro
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      //Se la validazione fallisce imposto l'errore a true
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  /**
   * Per accedere ai campi del form facilmente
   */
  get f() {
    return this.changeForm.controls;
  }

  /**
   * Al click del pulsante "Invia Password" invio l'email inserita dall'utente
   * per recuperare la password
   */
  onSubmit() {
    this.submitted = true;

    // Se il form non è valido mi fermo
    if (this.changeForm.invalid) {
      return;
    }

  }

}
