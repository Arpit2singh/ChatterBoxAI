package com.ChatterBox.demo.Entity;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class UserEntity {

@Id
@GeneratedValue 
private UUID id ; 


private String name ; 
public UUID getId(){
    return id ; 
}
public void setId(UUID id){
    this.id = id ; 
}

public void setName(String name){
    this.name = name  ; 
}
public String getName(){
    return name ; 
}

}