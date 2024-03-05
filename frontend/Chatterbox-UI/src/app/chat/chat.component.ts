import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {


  users: User[] = [];
  dummyUsers: User[] = [];
  selectedUser!: User;

  constructor(private userService: UserService){

  }

  ngOnInit(): void {


    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });


    this.userService.activeUsers$.subscribe(user =>{
      console.log("new user added to user array"+user)
      this.users.push(user)
    })

    
  }

  userSelected(user:User) {
    console.log("clicked")
    console.log(user)
    this.selectedUser=user;
    }

}
