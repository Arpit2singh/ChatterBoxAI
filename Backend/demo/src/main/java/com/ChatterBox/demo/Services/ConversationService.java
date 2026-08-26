package com.ChatterBox.demo.Services;

import com.ChatterBox.demo.Entity.conversationEntity;
import java.util.List;
public interface ConversationService {
    
    conversationEntity saveConversation(conversationEntity conversation) ; 
    List<conversationEntity> getAllConversations() ;
}
