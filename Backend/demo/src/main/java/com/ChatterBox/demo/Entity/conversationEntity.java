package com.ChatterBox.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import java.time.LocalDateTime;
import java.util.UUID;
@Entity
@Table(name="conversation_message")
public class conversationEntity {

@Id 
@GeneratedValue(strategy = GenerationType.IDENTITY)
private long id;

@ManyToOne
@JoinColumn(name="channel_id")
private ChannelEntity channel ; 

@ManyToOne
@JoinColumn(name="user_id")
private UserEntity user ; 

@Column(columnDefinition = "TEXT")
private String message ;

private String speakerType ;
private LocalDateTime Timestamp ; 


public long getId() {
    return id;  
}
public void setId(long id) {
    this.id = id;
}
public ChannelEntity getChannel() {
    return channel;
}
public void setChannel(ChannelEntity channel) {
    this.channel = channel;
}
public UserEntity getUser() {
    return user;
}
public void setUser(UserEntity user) {
    this.user = user;
}
public String getMessage() {
    return message;
}
public void setMessage(String message) {
    this.message = message;
}
public String getSpeakerType() {
    return speakerType;
}
public void setSpeakerType(String speakerType) {
    this.speakerType = speakerType;
}
public LocalDateTime getTimestamp() {
    return Timestamp;
}
public void setTimestamp(LocalDateTime timestamp) {
    Timestamp = timestamp;
}
    
}
