package com.ChatterBox.demo.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ChatterBox.demo.Entity.Elements;

public interface ElementRepository extends JpaRepository<Elements , Long>{
    List<Elements> findByChannel_Id(UUID channelId);
}
