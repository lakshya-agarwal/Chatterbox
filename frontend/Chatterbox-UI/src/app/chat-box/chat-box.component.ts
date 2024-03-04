import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../models/User';
import { WebsocketService } from '../websocket.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent implements OnChanges {

  @Input() user!: User; 
  messages: any[] = [];
  newMessage: string = '';

  constructor(private websocketService: WebsocketService,
    private userService: UserService){

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      console.log('user changed:', this.user);
    }
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const newChatMessage = {
        "receiverId": 1,
        "senderId":this.userService.getUser().id,
        "content": this.newMessage,
        "timestamp": new Date(),
      };
      this.websocketService.sendMessage('/app/message',JSON.stringify(newChatMessage))
      
      this.newMessage = ''; // Clear the input field after sending
    }
  }

}
