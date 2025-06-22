import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { RegistrationService } from '../../Services/registration.service';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    NavbarComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  time: any = Date.now();
  isImgLoaded: boolean = false;
  featuredItems: any = [];

  constructor(
    private router: Router,
    private registrationService: RegistrationService,
  ) { }

  ngOnInit(): void {
    this.registrationService.getAllProducts().subscribe({
      next: (data: any) => {
        this.featuredItems = data.reverse().slice(0, 4);
      },
      error: (error) => {
        console.error('Failed to fetch products:', error);
      }
    });
  }

  navigateToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

  goToProducts() {
    this.router.navigate(['products'])
  }

  onLoad() {
    setTimeout(() => {
      this.isImgLoaded = true;
    }, 700);
  }
}