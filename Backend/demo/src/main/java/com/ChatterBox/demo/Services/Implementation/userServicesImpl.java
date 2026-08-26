package com.ChatterBox.demo.Services.Implementation;
import com.ChatterBox.demo.Entity.UserEntity;
import com.ChatterBox.demo.Repository.UserRepository;
import com.ChatterBox.demo.Services.UserServices;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class userServicesImpl implements UserServices {
    @Autowired
    UserRepository userRepository ; 
    @Override
    public UserEntity userRegister(String name){
        UserEntity user = new UserEntity() ; 
        user.setName(name);
        userRepository.save(user) ; 
        return user ; 
    }

}
