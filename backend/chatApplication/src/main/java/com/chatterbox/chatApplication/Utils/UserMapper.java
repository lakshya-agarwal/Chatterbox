package com.chatterbox.chatApplication.Utils;

import org.springframework.stereotype.Component;

import com.chatterbox.chatApplication.Dto.UserTO;
import com.chatterbox.chatApplication.Entity.UserEntity;

@Component
public class UserMapper {

	 public UserTO toDto(UserEntity userEntity) {
		 	UserTO userDTO = new UserTO();
	        userDTO.setId(userEntity.getId());
	        userDTO.setName(userEntity.getName());
	        userDTO.setEmail(userEntity.getEmail());
	        userDTO.setConnected(userEntity.isConnected());
	        return userDTO;
	    }
	
	 public UserEntity toEntity(UserTO userDTO) {
	        UserEntity userEntity = new UserEntity();
	        userEntity.setId(userDTO.getId());
	        userEntity.setName(userDTO.getName());
	        userEntity.setConnected(userDTO.getConnected());
	        return userEntity;
	    }
}
