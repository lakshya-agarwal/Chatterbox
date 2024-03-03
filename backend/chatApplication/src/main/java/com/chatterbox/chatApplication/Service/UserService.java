package com.chatterbox.chatApplication.Service;

import java.util.List;
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
		
		return userRepository.findAll().stream()
				.filter(UserEntity::isConnected)
				.map(mapper::toDto)
				.collect(Collectors.toList());
	}

}
