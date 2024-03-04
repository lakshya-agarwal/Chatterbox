import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompClient!: Client;


  constructor(private userService:UserService) {
    
  }

  initializeWebSocketConnection(user:any) {
    const socket = new WebSocket('ws://localhost:8765/ws');

    socket.addEventListener('open', (event) => {
      console.log('Connected to WebSocket');
    });

    socket.addEventListener('close', (event) => {
      console.log('Disconnected from WebSocket');
    });

    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8765/ws', // WebSocket endpoint in your Spring Boot backend
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.stompClient.activate();

    this.stompClient.onConnect = (frame) => {
      console.log('STOMP: Connected to WebSocket');
      /*this.sendMessage('/app/message', JSON.stringify({
          "name": 1,
          "email":1
      }));*/

     this.userService.saveUser(user).subscribe(
      (response) => {
        console.log('User added successfully:', response);
        this.userService.storeUser(response);
    
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
  };
    return true;
  }

  sendMessage(destination: string, message: any) {
    console.log(message)
    this.stompClient.publish({ destination, body:message });
  }

  subscribe(destination: string, callback: (message: Message) => void) {
    
    const subscribeWithRetry = () => {
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.subscribe(destination, callback);
      } else {
        console.log('STOMP connection is not active. Retrying in 1 second...');
        setTimeout(subscribeWithRetry, 1000); // Retry after 1 second
      }
    };

    subscribeWithRetry();
  }

 
}
