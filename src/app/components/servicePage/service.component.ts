import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-service',
  imports: [NavbarComponent, RouterLink],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {

  currentYear: number;
  constructor() {
    this.currentYear = new Date().getFullYear();
  }

}
