package com.example.saver.saver_web.models;

import jakarta.validation.constraints.NotBlank;

public class RequestModels {

    public static class Auth {
        public record connectUser(
                @NotBlank(message = "Invalid username")
                String username,
                @NotBlank(message = "Invalid password")
                String password
        ) {}
        public record createUser(
                @NotBlank(message = "Must have username")
                String username,
                @NotBlank(message = "Must have password")
                String password
        ) {}
    }

    public static class User {

    }

    public static class Project {

    }
}
