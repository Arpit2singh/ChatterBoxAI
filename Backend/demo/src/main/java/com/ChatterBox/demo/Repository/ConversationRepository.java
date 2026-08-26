package com.ChatterBox.demo.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ChatterBox.demo.Entity.conversationEntity;
public interface ConversationRepository extends JpaRepository<conversationEntity, Long> {
    
}
