package org.example.eventservice.controller;

import org.example.eventservice.dto.RegistrationRequestDto;
import org.example.eventservice.dto.EventResponseDto;
import org.example.eventservice.dto.RegistrationResponseDto;
import org.example.eventservice.entity.Registration;
import org.example.eventservice.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/events")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping("/{eventId}/registration")
    public ResponseEntity<RegistrationResponseDto> register(
            @PathVariable String eventId,
            @RequestBody RegistrationRequestDto dto
    ) {
        Registration reg = registrationService.register(
                eventId,
                dto.getName(),
                dto.getEmail()
        );

        RegistrationResponseDto response = new RegistrationResponseDto(
                reg.getRegistrationId(),
                reg.getEventId(),
                reg.getEmail(),
                reg.getRegistrationDate()
        );

        return ResponseEntity.ok(response);
    }
}