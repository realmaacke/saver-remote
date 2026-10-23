package com.example.saver.saver_web.controllers;

import com.example.saver.saver_web.annotations.RequiresAuth;
import com.example.saver.saver_web.models.ResponseModels.GenericResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
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
