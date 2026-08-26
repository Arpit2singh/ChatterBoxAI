package com.ChatterBox.demo.Services.Implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ChatterBox.demo.Entity.Elements;
import com.ChatterBox.demo.Repository.ElementRepository;
import com.ChatterBox.demo.Services.ElementService;
import com.ChatterBox.demo.Entity.ChannelEntity;
import java.util.List;
@Service
public class ElementServiceImpl implements ElementService {
    
   

    @Autowired
    ElementRepository elementRepository ; 
    @Override
    public Elements createElement(Elements element){
        
        return elementRepository.save(element) ; 
    }
    @Override
    public Elements updateElement(Elements element){
        Elements existingElement = elementRepository.findById(element.getId()).orElseThrow() ; 
        existingElement.setType(element.getType());
        existingElement.setShape(element.getShape());
        existingElement.setPositionX(element.getPositionX());
        existingElement.setPositionY(element.getPositionY());
        return elementRepository.save(existingElement);
    }

    @Override
    public void deleteElement(Long id){
        Elements exisitingElement = elementRepository.findById(id).orElseThrow() ; 
        elementRepository.deleteById(exisitingElement.getId());
    }
    
    @Override
    public Elements moveElement(Long id, double newX, double newY){
        Elements existingElement = elementRepository.findById(id).orElseThrow() ; 
        existingElement.setPositionX(newX);
        existingElement.setPositionY(newY);
        return elementRepository.save(existingElement) ; 
    }

    @Override
    public Elements resizeElement(Long id, double newWidth, double newHeight){
        Elements exisitingElement = elementRepository.findById(id).orElseThrow() ; 
        exisitingElement.setSizeY(newHeight);
        exisitingElement.setSizeX(newWidth);
        return elementRepository.save(exisitingElement) ; 
    }  

    @Override
    public Elements createText(String text, double x, double y, ChannelEntity channel){
        Elements element = new Elements() ; 
        element.setType("text");
        element.setText(text);
        element.setPositionX(x);
        element.setPositionY(y);
        element.setChannelId(channel);
        return elementRepository.save(element) ; 
    }

    @Override
    public Elements formatText(Long id, String font, Integer fontSize, String color){ 
        Elements existingElement = elementRepository.findById(id).orElseThrow() ; 
       
        existingElement.setFont(font);
        existingElement.setFontSize(fontSize);
        existingElement.setColor(color);
        return elementRepository.save(existingElement) ; 
    }

    @Override
    public Elements UpdateText(Long id, String newText){
        Elements existingElement = elementRepository.findById(id).orElseThrow() ; 
        existingElement.setText(newText);
        return elementRepository.save(existingElement) ; 
    }

    @Override
    public List<Elements> getAllElementsByChannel(ChannelEntity channel){
         return elementRepository.findByChannel_Id(channel.getId()) ;
    }
}
