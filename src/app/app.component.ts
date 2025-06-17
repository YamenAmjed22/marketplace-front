import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationDialogComponent } from 'nzrm-ng';

@Component({
  selector: 'app-root',
  imports: [
    ConfirmationDialogComponent,
    RouterOutlet,
    
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'marcktPlaceYamen';
}
