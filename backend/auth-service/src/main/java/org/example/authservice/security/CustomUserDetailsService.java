package org.example.authservice.security;

import org.example.authservice.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // later: load user for Spring Security
}