package com.ChatterBox.demo.Services.Implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ChatterBox.demo.Entity.conversationEntity;
import com.ChatterBox.demo.Repository.ConversationRepository;
import com.ChatterBox.demo.Services.ConversationService;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ConversationServiceImpl implements ConversationService {

    @Autowired
    ConversationRepository conversationRepository ; 

    @Override
    public conversationEntity saveConversation(conversationEntity conversation){
        conversation.setTimestamp(LocalDateTime.now());
        return conversationRepository.save(conversation) ; 
    }
    @Override
    public List<conversationEntity> getAllConversations(){
        return conversationRepository.findAll() ; 
    }

}
