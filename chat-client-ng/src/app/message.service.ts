import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client'
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public stompClient;
  public msg = [];

  name: string;
  toUsername: string;

  static connectedUsers = [''];

  constructor() {
    this.initializeWebSocketConnection();
  }


  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8081/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;

    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/message' + this.name, (message) => {
        if (message.body) {
          that.msg.push(message.body);
        }
      });
    });
  }

  register(name) {
    this.name = name;
    console.log("REGISTER SERVICE : Registration in progress for this user"+this.name);
    MessageService.connectedUsers.push(this.name);
    return "Welcome User :" + this.name;
  }


  disconnect(name: string) {
    if (MessageService.connectedUsers.find(user => user == name)) {
      MessageService.connectedUsers.splice(MessageService.connectedUsers.indexOf(name), 1);
      return "user disconnected";
    }
    else
      return "user is not found";
  }

  sendMessage(message, toUsername: string) {
    message = "User " + this.name + ": " + message;
    this.stompClient.send('/app/send/message', toUsername, message);
  }
}
