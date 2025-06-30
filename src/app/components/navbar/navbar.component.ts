import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
goToRegistration() {
    this.router.navigate(['']);

}

  isLoggedIn(): boolean {
  return !!localStorage.getItem('authToken');
}

  logOut():void {
    localStorage.removeItem("authToken");
    this.router.navigate(['/login']);
  }
  logo: String = "Stroll @ The Markcet "
  goToContact() {
    this.router.navigate(['/contact'])
  }

  constructor(private router: Router) { }

  goToProducts() {
    this.router.navigate(['/products'])
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }

  goToHomePage() {
    this.router.navigate(['/homepage'])
  }

  goToAbout() {
    this.router.navigate(['/about'])
  }
  goToService() {
    this.router.navigate(['/service'])
  }

}
