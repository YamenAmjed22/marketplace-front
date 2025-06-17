import { Component } from '@angular/core';
import { RegistrationService } from '../../Services/registration.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule, NotificationService } from 'nzrm-ng';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-check-otp',
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './check-otp.component.html',
  styleUrls: ['./check-otp.component.scss']
})
export class CheckOTPComponent {

  otp: String = '';
  isLoading = false;

  constructor(
    private registrationService: RegistrationService,
    private _notificationService: NotificationService,
    private _router:Router
  ) {
  }

  verifyOtp(): void {

    const email = localStorage.getItem('email');
    const payload = { email, otp: this.otp };
    
    if(!email || this.otp.length !== 6) {
      this._notificationService.warn('Warning', "Not valid to submit!");
      return
    }
    this.isLoading = true;
    
    this.registrationService.verifyOtp(payload).subscribe({
      next: (res: any) => {
        localStorage.removeItem('email');
        console.log("ssssss");
        this.isLoading = false;
        this._notificationService.success("Success", "Account verified successfully!");
        this.otp = '';
        this._router.navigate(["/login"])
      }, error: (err) => {
        console.error("Error fetching OTP: ", err.error.message);
        this._notificationService.error("Error", err.error.message);
        this.isLoading = false;
      }
    })
  }
}
