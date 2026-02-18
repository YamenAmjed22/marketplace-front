import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-about',
  imports: [NavbarComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  constructor(private router: Router) { }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
