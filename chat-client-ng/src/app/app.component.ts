import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import { MessageService } from './message.service';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebSockets chat';

  input : string;
  name : string
  toUsername : string;
  message : string
  constructor(public messageService: MessageService) {}
  sendMessage() {
    if (this.input) {
      this.messageService.sendMessage(this.input,this.toUsername);
      this.input = '';
    }
  }

  register(){
    this.message = this.messageService.register(this.name);
  }

  listConnectedUsers(){
    console.log(MessageService.connectedUsers);
    return MessageService.connectedUsers;
  }

}
