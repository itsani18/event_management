package org.example.eventservice.controller;
import jakarta.servlet.http.HttpServletRequest;
import org.example.eventservice.dto.EventRequestDto;
import org.example.eventservice.dto.EventResponseDto;
import org.example.eventservice.entity.Event;
import org.example.eventservice.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getEventById(@PathVariable String id) {
        Event event = eventService.getEventById(id);

        return ResponseEntity.ok(new EventResponseDto(
                event.getId(),
                event.getTitle(),
                event.getDate(),
                event.getType(),
                event.getDescription(),
                event.getSeatsLeft()
        ));
    }
    // ✅ CREATE (ADMIN)
    @PostMapping
    public ResponseEntity<?> createEvent(
            @RequestBody EventRequestDto dto,
            HttpServletRequest request) {

        String role = (String) request.getAttribute("role");
        System.out.println("ROLE = " + role);

        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body("Only ADMIN can create events");
        }

        Event event = new Event();
        event.setTitle(dto.getTitle());
        event.setDate(dto.getDate());
        event.setType(dto.getType());
        event.setDescription(dto.getDescription());
        event.setSeatsLeft(dto.getSeatsLeft());

        Event saved = eventService.createEvent(event);

        return ResponseEntity.ok(new EventResponseDto(
                saved.getId(),
                saved.getTitle(),
                saved.getDate(),
                saved.getType(),
                saved.getDescription(),
                saved.getSeatsLeft()
        ));
    }

    // ✅ GET ALL (PUBLIC)
    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    // ✅ UPDATE (ADMIN)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(
            @PathVariable String id,
            @RequestBody EventRequestDto dto,
            HttpServletRequest request) {

        String role = (String) request.getAttribute("role");

        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body("Only ADMIN can update events");
        }

        Event updated = eventService.updateEvent(id, dto);

        return ResponseEntity.ok(new EventResponseDto(
                updated.getId(),
                updated.getTitle(),
                updated.getDate(),
                updated.getType(),
                updated.getDescription(),
                updated.getSeatsLeft()
        ));
    }

    // ✅ DELETE (ADMIN)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(
            @PathVariable String id,
            HttpServletRequest request) {

        String role = (String) request.getAttribute("role");

        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body("Only ADMIN can delete events");
        }

        eventService.deleteEvent(id);
        return ResponseEntity.ok("Event deleted");
    }
}