package com.ChatterBox.demo.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ChatterBox.demo.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity , UUID >{
    
}
