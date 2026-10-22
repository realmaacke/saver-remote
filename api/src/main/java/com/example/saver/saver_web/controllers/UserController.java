package com.example.saver.saver_web.controllers;

import com.example.saver.saver_web.annotations.RequiresAuth;
import com.example.saver.saver_web.models.ResponseModels.GenericResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @RequiresAuth
    @RequestMapping("/user/id/")
    public GenericResponse RetrieveUserById(
            @RequestParam Integer user_id
    ) {

        // db search for user
        // if user: return user in data
        return new GenericResponse(
                null,
                true,
                ""
        );
    }

    @RequiresAuth
    @RequestMapping("/user/name/")
    public GenericResponse RetriveUserByName(
            @RequestParam String name
    ) {

        // db search for user
        // if user: return user in data
        return new GenericResponse(
                null,
                true,
                ""
        );
    }

}
