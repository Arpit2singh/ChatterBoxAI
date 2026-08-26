package com.ChatterBox.demo.Services.Implementation;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ChatterBox.demo.Services.LiveKitService;

import io.livekit.server.AccessToken;
import io.livekit.server.RoomJoin;
import io.livekit.server.RoomName;

@Service
public class LiveKitServiceImpl implements LiveKitService {
    
    @Value("${livekit.api.key}")
    private String apikey ; 
    @Value("${livekit.api.secret}")
    private String apisecret ;  
    @Value("${livekit.api.url}")
    private String url ;
    
    @Override
    public String generateToken(String roomName, String participantIdentity, String participantName) {
      AccessToken accessToken = new AccessToken(apikey, apisecret) ; 
      accessToken.setName(participantName);
      accessToken.setIdentity(participantIdentity);
      accessToken.addGrants(new RoomJoin(true) , new RoomName(roomName) );
      String jwt = accessToken.toJwt() ; 
      return jwt ; 
    }
}
