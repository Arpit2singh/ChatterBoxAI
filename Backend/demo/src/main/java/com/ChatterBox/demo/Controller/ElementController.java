package com.ChatterBox.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.UUID;
import com.ChatterBox.demo.Entity.Elements;
import com.ChatterBox.demo.Repository.ChannelRepository;
import com.ChatterBox.demo.Services.ElementService;
import com.ChatterBox.demo.Services.Implementation.ElementServiceImpl;
import com.ChatterBox.demo.Entity.ChannelEntity;
import java.util.List;

@RestController
public class ElementController {
    @Autowired
    private ElementService elementService ; 
    @Autowired 
    private ChannelRepository channelRepository ;
    
@PostMapping("/createElement")
public Elements createElement(@RequestBody Elements elements){
    return elementService.createElement(elements) ; 
}  

@PostMapping("/updateElement")
public Elements updateElement(@RequestBody Elements elements){
    return elementService.updateElement(elements) ; 
}

@DeleteMapping("/deleteElement")
public void deleteElement(@RequestParam Long id){
    elementService.deleteElement(id) ; 
}

@PostMapping("/moveElement")
public Elements moveElement(@RequestParam Long id, @RequestParam double newX, @RequestParam double newY){
    return elementService.moveElement(id, newX, newY);
}

@PostMapping("/resizeElement")
public Elements resizeElement(@RequestParam Long id, @RequestParam double newWidth, @RequestParam double newHeight){
    return elementService.resizeElement(id, newWidth, newHeight);
}

@PostMapping("/createText")
public Elements createText(@RequestParam String text, @RequestParam double x, @RequestParam double y, @RequestParam UUID channelId){
    ChannelEntity channel = channelRepository.findById(channelId).orElseThrow();
    return elementService.createText(text, x, y, channel);
}
@PostMapping("/formatText")
public Elements formatText(@RequestParam Long id, @RequestParam String font, @RequestParam Integer fontSize, @RequestParam String color){
    return elementService.formatText(id, font, fontSize, color);
}   

@PostMapping("/updateText")
public Elements UpdateText(@RequestParam Long id, @RequestParam String newText){
    return elementService.UpdateText(id, newText);
}

@GetMapping("/getAllElementsByChannel")
public List<Elements> getAllElementsByChannel(@RequestParam UUID channelId){
    ChannelEntity channel = channelRepository.findById(channelId).orElseThrow();
    return elementService.getAllElementsByChannel(channel);
}

}