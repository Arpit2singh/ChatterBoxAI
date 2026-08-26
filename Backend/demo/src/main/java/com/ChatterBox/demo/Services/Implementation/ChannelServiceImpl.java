package com.ChatterBox.demo.Services.Implementation;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ChatterBox.demo.Entity.ChannelEntity;
import com.ChatterBox.demo.Entity.ChannelMemberEntity;
import com.ChatterBox.demo.Entity.UserEntity;
import com.ChatterBox.demo.Repository.ChannelMemberRepository;
import com.ChatterBox.demo.Repository.ChannelRepository;
import com.ChatterBox.demo.Repository.UserRepository;
import com.ChatterBox.demo.Services.ChannelServices;

@Service
public class ChannelServiceImpl implements ChannelServices {
    @Autowired
    ChannelRepository channelRepository ; 
    @Autowired
    UserRepository userRepository  ;
    @Autowired
    ChannelMemberRepository channelMemberRepository ;

    @Override
    public ChannelEntity createChannel(String name , UUID createdByUserId){
       UserEntity user = userRepository.findById(createdByUserId).orElseThrow() ; 
       ChannelEntity channel = new ChannelEntity() ;
       channel.setName(name);
       channel.setCreatedBy(user);
       channel.setCreatedAt(LocalDateTime.now());
       channelRepository.save(channel) ; 
       return channel ;
    }

    @Override
    public ChannelMemberEntity joinChannel(UUID channelId , UUID userId){
      ChannelEntity channel = channelRepository.findById(channelId).orElseThrow() ; 
      UserEntity user = userRepository.findById(userId).orElseThrow() ; 
      ChannelMemberEntity channelMember = new ChannelMemberEntity() ; 
      channelMember.setChannel(channel); 
      channelMember.setUser(user);
      channelMember.setJoinedAt(LocalDateTime.now());
      channelMemberRepository.save(channelMember) ;
      return channelMember ;
    }

    @Override
    public List<ChannelEntity> getAllChannels() {
      return channelRepository.findAll();
    }
}
