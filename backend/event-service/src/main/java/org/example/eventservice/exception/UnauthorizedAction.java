package org.example.eventservice.exception;

public class UnauthorizedAction extends RuntimeException {

    public UnauthorizedAction(String message) {
        super(message);
    }
}