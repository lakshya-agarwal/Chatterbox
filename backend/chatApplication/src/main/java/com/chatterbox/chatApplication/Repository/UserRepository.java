package com.chatterbox.chatApplication.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatterbox.chatApplication.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long>{

	

}
