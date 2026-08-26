package com.ChatterBox.demo.Controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ChatterBox.demo.Services.ChannelServices;
import com.ChatterBox.demo.Services.LiveKitService;
import com.ChatterBox.demo.Entity.ChannelEntity;
import com.ChatterBox.demo.Entity.ChannelMemberEntity;
import org.springframework.web.bind.annotation.RequestParam;
@RestController
public class ChannelController {
    @Autowired
    ChannelServices channelServices ;
    @Autowired
    LiveKitService liveKitService ; 

    @PostMapping("/createChannel")    
    ChannelEntity createChannel(@RequestParam String name , @RequestParam UUID createdByUserId){
       return channelServices.createChannel(name , createdByUserId) ;
    }
    @PostMapping("/joinChannel")
    ChannelMemberEntity joinChannel(@RequestParam UUID channelId , @RequestParam UUID userId){
        return channelServices.joinChannel(channelId , userId) ;
    }  
    @PostMapping("/joinChannelWithName")
    String joinChannelWithName(@RequestParam String roomname , @RequestParam String participantIdentity , @RequestParam String participantName){
        return liveKitService.generateToken(roomname, participantIdentity, participantName);
    }
    @GetMapping("/getAllChannels")
    List<ChannelEntity> getAllChannels(){
        return channelServices.getAllChannels();
    }
    // @PostMapping("/AskQuestion")
    // String AskQuestion(@RequestParam String question){
    //     return channelServices
    // }
}
