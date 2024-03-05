package com.chatterbox.chatApplication.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chatterbox.chatApplication.Dto.UserTO;
import com.chatterbox.chatApplication.Entity.UserEntity;
import com.chatterbox.chatApplication.Repository.UserRepository;
import com.chatterbox.chatApplication.Utils.UserMapper;

@Service
public class UserService {

	@Autowired
	public UserRepository userRepository;

	@Autowired
	public UserMapper mapper;

	public List<UserTO> findAllConnectedUsers() {

		return userRepository.findAll().stream().filter(UserEntity::isConnected).map(mapper::toDto)
				.collect(Collectors.toList());
	}
	
	

	public UserTO saveUser(UserTO user) {
		String userName = user.getName();
	    
	    // Check if the user with the given name already exists in the database
	    Optional<List<UserEntity>> existingUserOptional = userRepository.findByName(userName);

	    if (existingUserOptional.isPresent() && !existingUserOptional.get().isEmpty()) {
	        // User with the given name already exists, update its status to "active"
	        UserEntity existingUser = existingUserOptional.get().get(0);
	        existingUser.setConnected(true);
	        UserEntity savedUser = userRepository.save(existingUser);

	        // Return the updated user information in the response
	        return mapper.toDto(savedUser);
	    } else {
	        // User with the given name doesn't exist, create a new user
	        user.setConnected(true);
	        UserEntity newUserEntity = mapper.toEntity(user);
	        UserEntity savedUser = userRepository.save(newUserEntity);

	        // Return the new user information in the response
	        return mapper.toDto(savedUser);
	    }
	    
	    
	}

}
