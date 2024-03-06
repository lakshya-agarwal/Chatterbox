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
      
      this.users = users.filter(u=>u.id !== this.userService.getUser().id);

      console.log(this.users)
    });


    this.userService.activeUsers$.subscribe(update => {
      console.log("new user added to user array: ");
      if (update.action === 'add') {
          this.users.push(update.user);
      } else if (update.action === 'remove') {
          this.users = this.users.filter(u => u.id !== update.user.id);
      }
  });
  

    for (let i = 1; i <= 2; i++) {
      this.dummyUsers.push({
        id: `user${i}`,
        name: `User ${i}`,
        email:`email ${i}`,
        imageURL: `https://placekitten.com/50/50?image=${i}`, // Placeholder image URL
      });
    }
  }

  userSelected(user:User) {
    console.log("clicked")
    console.log(user)
    this.selectedUser=user;
    }

}
