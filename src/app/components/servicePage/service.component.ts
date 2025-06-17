import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-service',
  imports: [NavbarComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent { 
  
  currentYear:number; 
  constructor(){
    this.currentYear = new Date().getFullYear();
  }

}
