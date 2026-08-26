package com.ChatterBox.demo.Services;

import java.util.UUID;
import java.util.List;

import com.ChatterBox.demo.Entity.ChannelEntity;
import com.ChatterBox.demo.Entity.ChannelMemberEntity;

public interface ChannelServices {
    
    ChannelEntity createChannel(String name , UUID createdByUserId) ;
    ChannelMemberEntity joinChannel(UUID channelId , UUID userId) ;  
    List<ChannelEntity> getAllChannels();
    
}
