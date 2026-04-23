package org.example.authservice.service;

import org.example.authservice.dto.LoginRequestDto;
import org.example.authservice.dto.SignupRequestDto;
import org.example.authservice.entity.User;
import org.example.authservice.exception.InvalidCredentialsException;
import org.example.authservice.exception.UserAlreadyExistsException;
import org.example.authservice.exception.UserNotFoundException;
import org.example.authservice.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 🔥 SIGNUP
    @Override
    public User signup(SignupRequestDto dto) {

        // ✅ USERNAME UNIQUE
        userRepository.findByUsername(dto.getUsername())
                .ifPresent(u -> {
                    throw new UserAlreadyExistsException("Username already exists");
                });

        // ✅ PASSWORD VALIDATION
        String passwordRegex = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$";

        if (!dto.getPassword().matches(passwordRegex)) {
            throw new RuntimeException(
                    "Password must be 8+ chars with letter, number, special char"
            );
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setRole(dto.getRole());

        return userRepository.save(user);
    }

    // 🔥 LOGIN
    @Override
    public User login(LoginRequestDto dto) {

        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (!user.getPassword().equals(dto.getPassword())) {
            throw new InvalidCredentialsException("Invalid password");
        }

        return user;
    }
}