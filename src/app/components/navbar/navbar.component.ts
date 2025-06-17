import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

goToContact() {
    this.router.navigate(['/contact'])
}

  constructor(private router:Router){} 

  goToProducts(){
    this.router.navigate(['/products'])
  } 

    goToLogin(){
    this.router.navigate(['/login'])
  }

   goToHomePage(){
    this.router.navigate(['/homepage'])
  }

  goToAbout(){
    this.router.navigate(['/about'])
  }
  goToService(){
    this.router.navigate(['/service'])
  }

}
