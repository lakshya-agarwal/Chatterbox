import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private activeUsersSubject = new BehaviorSubject<User>({} as any);
  public activeUsers$ = this.activeUsersSubject.asObservable();


  //whenver i new user uis added and the client is informed usin websocket then this method is called
  addUser(newUser:User){
    this.activeUsersSubject.next(newUser);

  }
  

  private apiUrl = 'http://localhost:8765/'; 


  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+"users");
  }


  saveUser(user:any):Observable<User>{
    return this.http.post<User>(this.apiUrl+"addUser",user);
  }

  storeUser(user: User) {
    sessionStorage.setItem("user", JSON.stringify(user));

  }

  getUser(): User {
    const storedUser = sessionStorage.getItem("user",);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  onBeforeUnload() {
    // Perform logout actions and clear session storage
    this.logout();
  }

  logout() {
    // Your logout logic here
    // For example, clear session storage
    sessionStorage.clear();
  }
}
