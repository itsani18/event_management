package org.example.eventservice.dto;

import java.time.LocalDateTime;

public class EventResponseDto {

    private String id;
    private String title;
    private LocalDateTime date;
    private String type;
    private String description;
    private int seatsLeft;

    public EventResponseDto(String id, String title, LocalDateTime date, String type,
                            String description, int seatsLeft) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.type = type;
        this.description = description;
        this.seatsLeft = seatsLeft;
    }

    // ✅ VERY IMPORTANT (GETTERS)

    public String getId() { return id; }
    public String getTitle() { return title; }
    public LocalDateTime getDate() { return date; }
    public String getType() { return type; }
    public String getDescription() { return description; }
    public int getSeatsLeft() { return seatsLeft; }
}