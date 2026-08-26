package com.ChatterBox.demo.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import com.ChatterBox.demo.Entity.conversationEntity;
import com.ChatterBox.demo.Services.ConversationService;
@RestController
public class ConversationController {

    @Autowired
    ConversationService conversationService;

    @PostMapping("/saveConversation")
    public conversationEntity saveConversation(@RequestBody conversationEntity conversation){
        return conversationService.saveConversation(conversation) ; 
    }

    @GetMapping("/getAllConversations")
    public java.util.List<conversationEntity> getAllConversations(){
        return conversationService.getAllConversations() ; 
    }

}
