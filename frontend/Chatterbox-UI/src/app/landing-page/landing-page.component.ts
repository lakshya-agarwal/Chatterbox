import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  userName: string = '';
  userEmail: string = '';

  constructor(private router: Router) {}
  
  onSubmit() {
    this.router.navigate(['/chat']);
  }
}
