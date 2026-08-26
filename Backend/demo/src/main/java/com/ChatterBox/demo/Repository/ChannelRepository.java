package com.ChatterBox.demo.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ChatterBox.demo.Entity.ChannelEntity;

public interface ChannelRepository extends JpaRepository<ChannelEntity , UUID>{
    
}
