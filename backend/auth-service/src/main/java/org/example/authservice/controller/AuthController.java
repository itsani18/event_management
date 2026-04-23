package org.example.authservice.controller;

import org.example.authservice.dto.*;
import org.example.authservice.entity.User;
import org.example.authservice.security.JwtUtil;
import org.example.authservice.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    // 🔥 SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<AuthResponseDto> signup(@RequestBody SignupRequestDto dto) {

        User user = authService.signup(dto);

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

        return ResponseEntity.ok(
                new AuthResponseDto(token, user.getUsername(), user.getRole())
        );
    }

    // 🔥 LOGIN
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginRequestDto dto) {

        User user = authService.login(dto);

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

        return ResponseEntity.ok(
                new AuthResponseDto(token, user.getUsername(), user.getRole())
        );
    }
}