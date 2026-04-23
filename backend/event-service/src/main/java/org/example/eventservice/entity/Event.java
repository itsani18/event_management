package org.example.eventservice.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;

    private LocalDateTime date;

    private String type;

    private String description;

    private int seatsLeft;

    // Default constructor
    public Event() {}

    // Parameterized constructor
    public Event(String title, LocalDateTime date, String type, String description, int seatsLeft) {
        this.title = title;
        this.date = date;
        this.type = type;
        this.description = description;
        this.seatsLeft = seatsLeft;
    }

    // Getters and Setters
    public String getId() { return id; }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getDate() {
        return date;
    }
    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public int getSeatsLeft() {
        return seatsLeft;
    }
    public void setSeatsLeft(int seatsLeft) {
        this.seatsLeft = seatsLeft;
    }
}