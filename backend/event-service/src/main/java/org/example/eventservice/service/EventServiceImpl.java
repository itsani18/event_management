package org.example.eventservice.service;

import org.example.eventservice.dto.EventRequestDto;
import org.example.eventservice.entity.Event;
import org.example.eventservice.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Event getEventById(String id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    @Override
    public Event updateEvent(String id, EventRequestDto dto) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        // update fields
        event.setTitle(dto.getTitle());
        event.setDate(dto.getDate());
        event.setType(dto.getType());
        event.setDescription(dto.getDescription());
        event.setSeatsLeft(dto.getSeatsLeft());

        return eventRepository.save(event);
    }

    @Override
    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }
}