package com.chatterbox.chatApplication.Dto;

public class UserTO {
	
	private Long id;
	private String name;
	private String email;
	private Boolean connected;
	
	
	
	public UserTO() {
		super();
	}
	public UserTO(Long id, String name, String email, Boolean connected) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.connected = connected;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Boolean getConnected() {
		return connected;
	}
	public void setConnected(Boolean connected) {
		this.connected = connected;
	}
	
	

}
