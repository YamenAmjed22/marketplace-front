import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  mobileMenuOpen = false;
  isNavbarVisible = true;
  isScrolled = false;
  lastScrollTop = 0;
  searchFocused = false;
  searchQuery = '';
  userMenuOpen = false;
  cartCount = 0;
  isAdmin = false;

  constructor(private router: Router, private adminService: AdminService) {
    this.isAdmin = this.adminService.isAdminLoggedIn();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = currentScroll > 20;

    if (currentScroll <= 0) {
      this.isNavbarVisible = true;
      this.lastScrollTop = currentScroll;
      return;
    }

    if (currentScroll > this.lastScrollTop) {
      this.isNavbarVisible = false;
      this.closeMobileMenu();
      this.userMenuOpen = false;
    } else {
      this.isNavbarVisible = true;
    }

    this.lastScrollTop = currentScroll;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      this.userMenuOpen = false;
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { search: this.searchQuery } });
      this.closeMobileMenu();
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logOut(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
    this.closeMobileMenu();
    this.userMenuOpen = false;
  }

  goToContact() { this.router.navigate(['/contact']); this.closeMobileMenu(); }
  goToProducts() { this.router.navigate(['/products']); this.closeMobileMenu(); }
  goToLogin() { this.router.navigate(['/login']); this.closeMobileMenu(); }
  goToHomePage() { this.router.navigate(['/homepage']); this.closeMobileMenu(); }
  goToAbout() { this.router.navigate(['/about']); this.closeMobileMenu(); }
  goToService() { this.router.navigate(['/service']); this.closeMobileMenu(); }
  goToCart() { this.router.navigate(['/cart']); this.closeMobileMenu(); }
  goToRegistration() { this.router.navigate(['registration']); this.closeMobileMenu(); }
  goToAdminDashboard() { this.router.navigate(['/admin/dashboard']); this.closeMobileMenu(); }
}
