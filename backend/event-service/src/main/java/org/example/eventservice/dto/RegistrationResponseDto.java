package org.example.eventservice.dto;

import java.time.LocalDateTime;

public class RegistrationResponseDto {

    private String registrationId;
    private String eventId;
    private String name;
    private String email;
    private LocalDateTime registrationDate;

    public RegistrationResponseDto(String registrationId, String eventId, String email, LocalDateTime registrationDate) {
        this.registrationId = registrationId;
        this.eventId = eventId;
        this.name = name;
        this.email = email;
        this.registrationDate = registrationDate;
    }

    public String getRegistrationId() {
        return registrationId;
    }

    public String getEventId() {
        return eventId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }
}