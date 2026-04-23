package org.example.authservice.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequestDto {

    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String role;

    // getters & setters
}
