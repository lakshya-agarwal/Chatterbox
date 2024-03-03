import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder) {}
  
  ngOnInit() {
      this.loginForm = this.fb.group({
          userName: ['', [Validators.required]],
          userEmail: ['', [Validators.required, Validators.email]],
      });
  }

  onSubmit() {
    if (this.loginForm.valid){
      this.router.navigate(['/chat']);
    }
   
  }
}
