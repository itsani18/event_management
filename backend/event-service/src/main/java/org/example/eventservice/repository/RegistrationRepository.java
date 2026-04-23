package org.example.eventservice.repository;

import org.example.eventservice.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, String> {

    // Optional (useful later)
    List<Registration> findByEventId(String eventId);

    List<Registration> findByEmail(String email);

    boolean existsByEventIdAndEmail(String eventId, String email);
}