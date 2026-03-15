import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { NotificationService } from 'nzrm-ng';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  LoginForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private _notificationService: NotificationService
  ) {
    this.LoginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.LoginForm.invalid) {
      return;
    }

    const loginData = this.LoginForm.value;

    this.adminService.loginAdminUser(loginData).subscribe({
      next: (res: any) => {
        this.LoginForm.reset();
        this.successMessage = "Login Successful!";
        this.submitted = false;
        this._notificationService.success("Success", "Admin login successful!");
        // Handles cases where backend might return an object like { token: "abc" } instead of a raw string.
        const token = res.token || res;
        localStorage.setItem('adminToken', token);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err: any) => {
        const errorMsg = err?.error?.message || err?.error || "Login failed";
        this._notificationService.error("Error", errorMsg);
      }
    });
  }
}

