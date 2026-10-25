package com.example.saver.saver_web.controllers;

import com.example.saver.saver_web.models.ResponseModels.GenericResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FallbackController {

    @RequestMapping(value = "/**")
    public ResponseEntity<GenericResponse> Fallback(
            HttpServletRequest request
    ) {
        String pathRequested = request.getMethod() + " " + request.getRequestURI();
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new GenericResponse(null, false, "Invalid request to: " + pathRequested));
    }

}
