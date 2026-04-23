package org.example.eventservice.service;

import org.example.eventservice.dto.EventRequestDto;
import org.example.eventservice.entity.Event;

import java.util.List;

public interface EventService {

    Event createEvent(Event event);

    List<Event> getAllEvents();

    Event getEventById(String id);

    Event updateEvent(String id, EventRequestDto dto);

    void deleteEvent(String id);
}