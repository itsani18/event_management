package org.example.eventservice.exception;

public class DuplicateRegistration extends RuntimeException {

    public DuplicateRegistration(String message) {
        super(message);
    }
}