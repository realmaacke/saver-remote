package com.example.saver.saver_web.controllers;

import com.example.saver.saver_web.annotations.RequiresAuth;
import com.example.saver.saver_web.dto.UserDTO;
import com.example.saver.saver_web.entities.UserEntity;
import com.example.saver.saver_web.models.RequestModels;
import com.example.saver.saver_web.models.ResponseModels.GenericResponse;
import com.example.saver.saver_web.services.AuthService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @RequiresAuth
    @RequestMapping(value = "/auth/token/renew", method = {RequestMethod.GET})
    public ResponseEntity<GenericResponse> RenewToken(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {

        

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GenericResponse(authHeader, true, "Token renewed"));
    }

    @RequestMapping(value = "/auth/connect", method = {RequestMethod.POST})
    public ResponseEntity<GenericResponse> ConnectUser(@Valid @RequestBody RequestModels.Auth.connectUser body) {
        String token = authService.connectUser(body.username(), body.password());
        if (token == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new GenericResponse(null, false, "Invalid credentials"));
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GenericResponse(token, true, "Successfully connected"));
    }

    @RequestMapping(value = "/auth/create-account", method = {RequestMethod.POST})
    public ResponseEntity<GenericResponse> CreateAccount(@Valid @RequestBody RequestModels.Auth.createUser body) {
        if (!authService.validPassword(body.password())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new GenericResponse(null, false, "Password must adhere to the requirements"));
        }

        try {
            UserDTO user = authService.createUser(body.username(), body.password());
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new GenericResponse(user, true, "Successfully created user!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new GenericResponse(null, false, e.getMessage()));
        }
    }
}
