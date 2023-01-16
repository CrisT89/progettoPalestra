import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  forgotForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  /**
   * Per accedere ai campi del form facilmente
   */
  get f() {
    return this.forgotForm.controls;
  }

  /**
   * Al click del pulsante "Invia Password" invio l'email inserita dall'utente
   * per recuperare la password
   */
  onSubmit() {
    this.submitted = true;

    // Se il form non è valido mi fermo
    if (this.forgotForm.invalid) {
      return;
    }

  }

}
