import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  

  private apiUrl = 'http://localhost:8765/'; 


  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+"users");
  }


  saveUser(user:any):Observable<User>{
    return this.http.post<User>(this.apiUrl+"addUser",user);
  }

  storeUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));

  }

  getUser(): User {
    const storedUser = localStorage.getItem("user",);
    return storedUser ? JSON.parse(storedUser) : null;
  }
}
