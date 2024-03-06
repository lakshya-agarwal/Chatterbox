package com.chatterbox.chatApplication.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.chatterbox.chatApplication.Dto.UserTO;
import com.chatterbox.chatApplication.Service.UserService;

@RestController
public class userController {

	@Autowired
	public UserService userService;

	@Autowired
	private SimpMessagingTemplate template;

	@GetMapping("/users")
	public ResponseEntity<List<UserTO>> getAllUsers() {
		return ResponseEntity.ok(userService.findAllConnectedUsers());
	}

//	@MessageMapping("/userConnected")
//	@SendTo("/topic/public")
//	public UserTO userConnected(@Payload UserTO user) {
//		
//		 userService.saveUser(user);
//		 return user;
//	}

	@PostMapping("/addUser")
	public ResponseEntity<UserTO> addUser(@RequestBody UserTO user) {

		// store the user in database and get its Id
		UserTO savedUser = userService.saveUser(user);

		// send the save user to all at public channel that all user have subscribed at
		// the beginning
		template.convertAndSend("/topic/public", savedUser, createHeaders("add"));
		// return response to the original user
		return ResponseEntity.ok(savedUser);
	}

	@PostMapping("/removeUser")
	public ResponseEntity<UserTO> removeUser(@RequestBody UserTO user) {

		// store the user in database and get its Id
		UserTO deletedUser = userService.removeUser(user);

		// send the save user to all at public channel that all user have subscribed at
		// the beginning
		template.convertAndSend("/topic/public", deletedUser, createHeaders("remove"));
		// return response to the original user
		return ResponseEntity.ok(deletedUser);
	}

	private MessageHeaders createHeaders(String action) {
		SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
		headerAccessor.setHeader("action", action);
		return headerAccessor.getMessageHeaders();
	}

}
