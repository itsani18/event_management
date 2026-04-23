package org.example.authservice.service;

import org.example.authservice.dto.LoginRequestDto;
import org.example.authservice.dto.SignupRequestDto;
import org.example.authservice.entity.User;

public interface AuthService {

    User signup(SignupRequestDto dto);

    User login(LoginRequestDto dto);
}