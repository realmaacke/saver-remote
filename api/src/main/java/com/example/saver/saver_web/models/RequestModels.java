package com.example.saver.saver_web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class RequestModels {

    /**
     * @Author marcus
     * @Description: Contains records of requests regarding Authentication.
     * @Date 2026-10-23 18:14
     **/
    public static class Auth {
        public record ConnectUser(
                @NotBlank(message = "Invalid username")
                String username,
                @NotBlank(message = "Invalid password")
                String password
        ) {}

        public record CreateUser(
                @NotBlank(message = "Must have username")
                String username,
                @NotBlank(message = "Must have password")
                String password
        ) {}
    }

    /**
     * @Author marcus
     * @Description: Contains of requests records regarding Users.
     * @Date 2026-10-23 18:11
     **/
    public static class User {

    }
    /**
     * @Author marcus
     * @Description: Contains records of requests regarding Projects.
     * @Date 2026-10-23 18:10
     **/

    public static class Project {
        public static class Upload {
            public record StartLine(
                    @NotNull @JsonProperty("commit_hash") String commitHash,
                    @NotNull String chapter
            ) implements UploadLine {}

            public record ChunkLine(
                    @NotNull String hash,
                    String mode,              // optional
                    @NotNull String content
            ) implements UploadLine {}

            public record DoneLine(
                    @NotNull Boolean success, // Boolean, not boolean, so a missing field is caught
                    @NotNull String message
            ) implements UploadLine {}


            @JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
            @JsonSubTypes({
                    @JsonSubTypes.Type(value = StartLine.class, name = "start"),
                    @JsonSubTypes.Type(value = ChunkLine.class, name = "chunk"),
                    @JsonSubTypes.Type(value = DoneLine.class, name = "done")
            })
            public sealed interface UploadLine permits StartLine, ChunkLine, DoneLine {}
        }
    }
}