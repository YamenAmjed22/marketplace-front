import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../../Services/registration.service';
import { Router } from '@angular/router';
import { NotificationService } from 'nzrm-ng';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-registration',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})

export class RegistrationComponent {


  loading:boolean = false; 
  registerForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';


  constructor(
    private fb: FormBuilder,
    private registrationService:RegistrationService,
    private router:Router,
    private _notificationService: NotificationService
  ) {
    this.registerForm = this.fb.group({

      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.minLength(10)]],
      address:['',]

    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';
    const registrationData = this.registerForm.value;

    if (this.registerForm.invalid) {
      return;
    }

    this .loading= true; 
    this.registrationService.registration(registrationData).subscribe({
      next:(res:any) =>{
        localStorage.setItem('email',this.registerForm.value.email);
        this.registerForm.reset();
        this.successMessage = res;
        this.submitted = false;
        this._notificationService.success("Success","The User Make Registration Success !")
        this.router.navigate(['/checkotp']);


      },error:(err)=>{
        this._notificationService.error("Error",err.error)
      }
    })
    
  }

  goToLoginPage(){
    this.router.navigate(['/login']);
  }


}
