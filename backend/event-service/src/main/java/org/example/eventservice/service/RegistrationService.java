package org.example.eventservice.service;

import org.example.eventservice.entity.Registration;

public interface RegistrationService {
    Registration register(String eventId, String name,String email);
}