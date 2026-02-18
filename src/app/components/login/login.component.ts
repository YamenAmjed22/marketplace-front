import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from 'nzrm-ng';
import { RegistrationService } from '../../Services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {



  LoginForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private _notificationService: NotificationService
  ) {
    this.LoginForm = this.fb.group({

      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],

    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';
    const loginnData = this.LoginForm.value;

    if (this.LoginForm.invalid) {
      return;
    }
    this.registrationService.login(loginnData).subscribe({
      next: (res: any) => {
        this.LoginForm.reset();
        this.successMessage = res;
        this.submitted = false;
        this._notificationService.success("Success", "The User Make login Success !")
        localStorage.setItem('authToken', res); // 🔐 Store token
        this.router.navigate(['homepage']);


      }, error: (err) => {
        this._notificationService.error("Error", err.error)
      }
    })

  }

  goToRegister() {
    this.router.navigate(['/registration'])
  }



}
