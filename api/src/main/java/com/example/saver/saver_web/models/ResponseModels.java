package com.example.saver.saver_web.models;

import org.springframework.http.ResponseEntity;

public class ResponseModels {
    public record GenericResponse(
            Object data,
            boolean success,
            String message
    ) {}
}