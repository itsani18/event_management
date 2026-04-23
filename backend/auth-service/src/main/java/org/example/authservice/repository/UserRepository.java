package org.example.authservice.repository;

import org.example.authservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    // 🔥 custom query method
    Optional<User> findByUsername(String username);

    // (optional but useful)
    Optional<User> findByEmail(String email);
}