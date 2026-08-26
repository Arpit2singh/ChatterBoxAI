package com.ChatterBox.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ChatterBox.demo.Entity.ChannelMemberEntity;
import java.util.UUID;
public interface ChannelMemberRepository extends JpaRepository<ChannelMemberEntity, UUID> {

}
