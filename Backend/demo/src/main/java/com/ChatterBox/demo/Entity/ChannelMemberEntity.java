package com.ChatterBox.demo.Entity;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class ChannelMemberEntity {

@Id
@GeneratedValue
private UUID id ;

@ManyToOne
private ChannelEntity channel ;
@ManyToOne 
private UserEntity user ;

private LocalDateTime joinedAt ; 

public UUID getId(){
    return id ; 
    
}
public void setId(UUID id){
    this.id = id ; 
}
public ChannelEntity getChannel(){
    return channel ; 
}
public void setChannel(ChannelEntity channel){
    this.channel = channel ; 
}
public UserEntity getUser(){
    return user ; 
}
public void setUser(UserEntity user){
    this.user = user ; 
}
public LocalDateTime getJoinedAt(){
    return joinedAt ; 
}
public void setJoinedAt(LocalDateTime joinedAt){
    this.joinedAt = joinedAt ; 
}

}
