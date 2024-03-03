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

  constructor(private userService: UserService){

  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });

    for (let i = 1; i <= 2; i++) {
      this.dummyUsers.push({
        id: `user${i}`,
        username: `User ${i}`,
        imageURL: `https://placekitten.com/50/50?image=${i}`, // Placeholder image URL
      });
    }
  }

}
