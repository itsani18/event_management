package org.example.eventservice.service;

import org.example.eventservice.entity.Event;
import org.example.eventservice.entity.Registration;
import org.example.eventservice.exception.DuplicateRegistration;
import org.example.eventservice.exception.EventNotFound;
import org.example.eventservice.repository.EventRepository;
import org.example.eventservice.repository.RegistrationRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.regex.Pattern;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    private final EventRepository eventRepository;
    private final RegistrationRepository registrationRepository;

    private static final Pattern EMAIL_REGEX =
            Pattern.compile("^[a-zA-Z0-9._%+-]+@gmail\\.com$", Pattern.CASE_INSENSITIVE);

    public RegistrationServiceImpl(EventRepository eventRepository,
                                   RegistrationRepository registrationRepository) {
        this.eventRepository = eventRepository;
        this.registrationRepository = registrationRepository;
    }

    @Override
    @Transactional
    public Registration register(String eventId, String name,String email) {

        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }

        // ✅ 1. EMAIL VALIDATION
        // ✅ EMAIL VALIDATION (GMAIL ONLY)
        if (email == null || !EMAIL_REGEX.matcher(email).matches()) {
            throw new IllegalArgumentException("Invalid email format (must be @gmail.com)");
        }
        // ✅ 2. CHECK EVENT EXISTS
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFound("Event not found"));

        // ✅ 3. DUPLICATE CHECK (BEFORE SEAT REDUCTION)
        boolean alreadyExists =
                registrationRepository.existsByEventIdAndEmail(eventId, email);

        if (alreadyExists) {
            throw new DuplicateRegistration("User already registered for this event");
        }

        // ✅ 4. CHECK SEATS
        if (event.getSeatsLeft() <= 0) {
            throw new RuntimeException("No seats available");
        }

        // ✅ 5. CREATE REGISTRATION
        Registration registration = new Registration();
        registration.setRegistrationId(java.util.UUID.randomUUID().toString());
        registration.setEventId(eventId);
        registration.setName(name);
        registration.setEmail(email);
        registration.setRegistrationDate(LocalDateTime.now());

        Registration saved = registrationRepository.save(registration);

        // ✅ 6. REDUCE SEATS (AFTER SUCCESS)
        event.setSeatsLeft(event.getSeatsLeft() - 1);
        eventRepository.save(event);

        return saved;
    }
}