package com.example.saver.saver_web.controllers;

import com.example.saver.saver_web.annotations.RequiresAuth;
import com.example.saver.saver_web.dto.UserDTO;
import com.example.saver.saver_web.entities.UserEntity;
import com.example.saver.saver_web.models.ResponseModels.GenericResponse;
import com.example.saver.saver_web.services.UserService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequiresAuth
    @RequestMapping(value = "/user/get-with-token", method = {RequestMethod.GET})
    public ResponseEntity<GenericResponse> RetrieveUserByToken(
            HttpServletRequest request
    ) {
        String tokenPrefix = "Bearer ";

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        String token = header != null && header.startsWith(tokenPrefix)
                ? header.substring(tokenPrefix.length()) : header;

        System.out.println(header);

        UserEntity user = userService.getUserByToken(token);

        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new GenericResponse(null, false, "Could not get user"));
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GenericResponse(
                        UserDTO.fromEntity(user),
                        true,
                        "success"
                ));
    }

    @RequiresAuth
    @RequestMapping(value = "/user/id/", method = {RequestMethod.GET})
    public ResponseEntity<GenericResponse> RetrieveUserById(
            @RequestParam Integer user_id
    ) {

        // db search for user
        // if user: return user in data
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GenericResponse(null, true, "")
        );
    }

    @RequiresAuth
    @RequestMapping(value = "/user/{name}", method = {RequestMethod.GET})
    public ResponseEntity<GenericResponse> RetriveUserByName(
            @PathVariable String name
    ) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GenericResponse(null, true, "")
        );
    }

}
