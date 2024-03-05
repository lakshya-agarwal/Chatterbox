// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = sessionStorage.getItem("user");

    if (user) {
      // User is logged in, allow access to the route
      return true;
    } else {
      // User is not logged in, redirect to the home page
      this.router.navigate(['']);
      return false;
    }
  }
}
