import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private websocketServie:WebsocketService) {}
  
  ngOnInit() {
      this.loginForm = this.fb.group({
          userName: ['', [Validators.required]],
          userEmail: ['', [Validators.required, Validators.email]],
      });
  }

  onSubmit() {
    if (this.loginForm.valid){
      const username = this.loginForm.get('userName')!.value;
      localStorage.setItem('name', username);

      const email = this.loginForm.get('userEmail')!.value;
      localStorage.setItem('email', email);

      this.websocketServie.initializeWebSocketConnection();
      this.router.navigate(['/chat']);
    }
   
  }
}
