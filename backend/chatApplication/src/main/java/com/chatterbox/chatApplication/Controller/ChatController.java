package com.chatterbox.chatApplication.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.chatterbox.chatApplication.Dto.MessageTO;

@Controller
public class ChatController {

	@Autowired
	private SimpMessagingTemplate template;
	
	
	
	@MessageMapping("/message")
	public void handleMessage(@Payload MessageTO msg) {
		
		template.convertAndSend("/topic/chat/"+msg.getChannelId(), msg);
		

	}
}
