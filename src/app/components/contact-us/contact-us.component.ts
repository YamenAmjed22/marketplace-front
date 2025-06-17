import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  
import { RegistrationService } from '../../Services/registration.service';
import { NotificationService } from 'nzrm-ng';
import { HttpHeaders } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule,ReactiveFormsModule , NavbarComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

  contactForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  email = 'yamenamjed23@gmail.com'

  constructor(
      
      private fb: FormBuilder,
      private registrationService:RegistrationService,
      private _notificationServices:NotificationService
  ) {
    
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required]
    });
  }

onSubmit() {
  this.submitted = true;

  // If your form is invalid, stop here
  if (this.contactForm.invalid) {
    return;
  }

  // Get token from localStorage
  const token = localStorage.getItem('authToken');
  
  // Add Authorization header
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  // Send the request with the token
  this.registrationService.contactUs(this.contactForm.value, headers).subscribe({
    next: (res: any) => {
      this.contactForm.reset();
      this.successMessage = res;
      this.submitted = false;
      this._notificationServices.success("Success", "The user made login successfully!");
    },
    error: (err) => {
      this._notificationServices.error("Error", err.message || "An error occurred.");
    }
  });
}


}



