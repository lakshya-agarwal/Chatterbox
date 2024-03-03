import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent implements OnChanges {

  @Input() user!: User; 
  messages: any[] = [];
  newMessage: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      console.log('user changed:', this.user);
    }
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const newChatMessage = {
        sender: this.user,
        content: this.newMessage,
        timestamp: new Date(),
      };

      this.messages.push(newChatMessage);
      this.newMessage = ''; // Clear the input field after sending
    }
  }

}
