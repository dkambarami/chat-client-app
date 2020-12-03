package com.websocket.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@CrossOrigin("http://localhost:4200")
public class WebSocketController {
    private final SimpMessagingTemplate template;

    @Autowired
    WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/send/message/{toUsername}")
    public void sendMessage(String message, @PathVariable String toUsername){
        System.out.println(message);
        this.template.convertAndSend("/message/"+toUsername,  message);
    }

}
