package com.ChatterBox.demo.Entity;

import java.time.LocalDateTime;
import java.util.UUID;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;

@Entity
public class ChannelEntity {
    
@Id
@GeneratedValue 
private UUID id ; 

private String name ; 

@ManyToOne
private UserEntity createdBy ; 

private LocalDateTime createdAt ; 

public UUID getId(){
    return id ; 
}
public void setId(UUID id){
    this.id = id ; 
}

public String getName(){
    return name ; 
}
public void setName(String name){
    this.name = name ;  
}

public LocalDateTime getCreatedAt(){
    return createdAt ; 
}
public void setCreatedAt(LocalDateTime createdAt){
    this.createdAt = createdAt ; 
}

public UserEntity getCreatedBy(){
    return createdBy ; 
}

public void setCreatedBy(UserEntity createdBy){
    this.createdBy = createdBy ; 
}


}
