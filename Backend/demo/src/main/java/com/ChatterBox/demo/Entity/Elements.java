package com.ChatterBox.demo.Entity;

import java.nio.channels.Channel;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "elements")
public class Elements {
  
    private String type;
    private String shape;
    private double positionX;
    private double positionY;
    private Double sizex ; 
    private Double sizey ; 
    private String Text ; 
    private String font ;
    private Integer fontSize ;
    private String color ;
    private String imageUrl ;
    
    @ManyToOne
    @JoinColumn(name= "channel_id")
    private ChannelEntity channel;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getShape() {
        return shape;
    }

    public void setShape(String shape) {
        this.shape = shape;
    }

    public double getPositionX() {
        return positionX;
    }

    public void setPositionX(double positionX) {
        this.positionX = positionX;
    }

    public double getPositionY() {
        return positionY;
    }

    public void setPositionY(double positionY) {
        this.positionY = positionY;
    }
    public ChannelEntity getChannelId() {
        return channel;
    }
    public void setChannelId(ChannelEntity channelId) {
        channel = channelId;
    }

     public Double getSizeX() {
        return sizex;
    }
    public void setSizeX(Double sizex) {
        this.sizex = sizex;
    }
    
    public Double getSizeY() {
        return sizey;
    }
    public void setSizeY(Double sizey) {
        this.sizey = sizey;
    }
    
    public String getText() {
        return Text;
    }
    public void setText(String Text) {
        this.Text = Text;
    }
    public String getFont() {
        return font;
    }
    public void setFont(String font) {
        this.font = font;
    }
    public Integer getFontSize() {
        return fontSize;
    }
    public void setFontSize(Integer fontSize) {
        this.fontSize = fontSize;
    }
    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

}
