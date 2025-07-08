import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome-page',
  imports: [],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {
    constructor(private router:Router){}
  goToRegistration(){
    this.router.navigate(['/registration'])
  }
  goToLogin(){
    this.router.navigate(['/login'])

  }

}
