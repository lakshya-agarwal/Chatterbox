package com.chatterbox.chatApplication.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.chatterbox.chatApplication.Dto.UserTO;
import com.chatterbox.chatApplication.Service.UserService;

@Controller
public class userController {
	
	@Autowired
	public UserService userService;
	
	@GetMapping("/users")
	public ResponseEntity<List<UserTO>> getAllUsers(){
		return ResponseEntity.ok(userService.findAllConnectedUsers());
	}
	
	@MessageMapping("/userConnected")
	@SendTo("/topic/public")
	public UserTO userConnected(@Payload UserTO user) {
		 userService.saveUser(user);
		 return user;
	}
	
	

}
