package com.ChatterBox.demo.Services;

import com.ChatterBox.demo.Entity.Elements;
import com.ChatterBox.demo.Entity.ChannelEntity;
import java.util.List;
public interface ElementService {

    Elements createElement(Elements element); 
    Elements updateElement(Elements element); 
    void deleteElement(Long id); 
    Elements moveElement(Long id, double newX, double newY); 
    Elements resizeElement(Long id, double newWidth, double newHeight); 
    Elements createText(String text, double x, double y , ChannelEntity channel); 
    Elements formatText(Long id, String font, Integer fontSize, String color); 
    Elements UpdateText(Long id, String newText);
    List<Elements> getAllElementsByChannel(ChannelEntity channel);
}
