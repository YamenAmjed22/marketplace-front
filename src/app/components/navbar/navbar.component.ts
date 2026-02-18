import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  mobileMenuOpen = false;
  isNavbarVisible = true;
  lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Show navbar at the very top
    if (currentScroll <= 0) {
      this.isNavbarVisible = true;
      this.lastScrollTop = currentScroll;
      return;
    }

    // Hide navbar when scrolling down, show when scrolling up
    if (currentScroll > this.lastScrollTop) {
      // Scrolling down
      this.isNavbarVisible = false;
      this.closeMobileMenu();
    } else {
      // Scrolling up
      this.isNavbarVisible = true;
    }

    this.lastScrollTop = currentScroll;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  goToRegistration() {
    this.router.navigate(['registration']);
    this.closeMobileMenu();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logOut(): void {
    localStorage.removeItem("authToken");
    this.router.navigate(['/login']);
    this.closeMobileMenu();
  }

  logo: String = "Stroll @ The Markcet "

  goToContact() {
    this.router.navigate(['/contact']);
    this.closeMobileMenu();
  }

  constructor(private router: Router) { }

  goToProducts() {
    this.router.navigate(['/products']);
    this.closeMobileMenu();
  }

  goToLogin() {
    this.router.navigate(['/login']);
    this.closeMobileMenu();
  }

  goToHomePage() {
    this.router.navigate(['/homepage']);
    this.closeMobileMenu();
  }

  goToAbout() {
    this.router.navigate(['/about']);
    this.closeMobileMenu();
  }

  goToService() {
    this.router.navigate(['/service']);
    this.closeMobileMenu();
  }

  goToContactMessages() {
    this.router.navigate(['contactusMessages']);
    this.closeMobileMenu();
  }

}
