package com.ChatterBox.demo.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.ChatterBox.demo.Entity.UserEntity;
import com.ChatterBox.demo.Services.UserServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
@RestController
public class UserController {
    
    @Autowired
    UserServices userServices ; 
    @PostMapping("/register")
    UserEntity registerUser(@RequestParam String name){
     return userServices.userRegister(name) ; 
    }

}
