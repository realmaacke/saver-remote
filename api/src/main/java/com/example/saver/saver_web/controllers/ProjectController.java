package com.example.saver.saver_web.controllers;

import com.example.saver.saver_web.annotations.RequiresAuth;
import com.example.saver.saver_web.entities.ProjectEntity;
import com.example.saver.saver_web.models.RequestModels;
import com.example.saver.saver_web.services.ProjectService;
import com.example.saver.saver_web.services.StorageService;
import com.example.saver.saver_web.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Validator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.example.saver.saver_web.models.ResponseModels.GenericResponse;
import com.example.saver.saver_web.models.RequestModels.Project.*;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ProjectController {

    private final ProjectService projectService;
    private final UserService userService;

    private final StorageService storageService;

    private static final ObjectMapper MAPPER = new ObjectMapper();

    public ProjectController(
            ProjectService projectService,
            StorageService storageService,
            UserService userService
    ) {
        this.projectService = projectService;
        this.storageService = storageService;
        this.userService = userService;
    }

    @RequestMapping(value = "/proj/{username}/{project_name}")
    public ResponseEntity<GenericResponse> getProject(
            @PathVariable String username,
            @PathVariable String project_name
    ) {

        // use the variables to also get storage of the project
        // also query db.

        // if is private, check if user owns it
        // for now, then add permissions and stuff

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GenericResponse(null, true, "")
        );
    }

    @RequiresAuth
    @RequestMapping(value = "/proj/init/{username}/{project_name}", method = {RequestMethod.GET})
    public ResponseEntity<GenericResponse> initProject(
        @PathVariable String username,
        @PathVariable String project_name
    ) {

        ProjectEntity project = projectService.CreateProject(username, project_name);

        if (project == null) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new GenericResponse(
                                    null,
                                    false,
                                    "Could not create project"
                            )
                    );
        }

        try {
            storageService.CreateProjectFolder(username, project_name);
        } catch (IOException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new GenericResponse(
                            null,
                            false,
                            "Internal server error"
                    ));
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GenericResponse(
                        null,
                        true,
                        "Successfully created project"
                )
        );
    }

    @RequiresAuth
    @RequestMapping(value = "/proj/upload/{username}/{project_name}", method = {RequestMethod.POST})
    public ResponseEntity<GenericResponse> uploadToProject(
            @PathVariable String username,
            @PathVariable String project_name,
            HttpServletRequest request
    ) throws IOException {
        List<Upload.UploadLine> lines = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(
                request.getInputStream(), StandardCharsets.UTF_8))) {
            String line;

            while ((line = reader.readLine()) != null) {
                if (line.isBlank()) continue;

                try {
                    Upload.UploadLine parsed = MAPPER.readValue(line, Upload.UploadLine.class);

                    if (parsed == null) {
                        return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(new GenericResponse(null, false, "Malformed NDJSON"));
                    }
                    lines.add(parsed);
                } catch (JacksonException e) {
                    return ResponseEntity
                            .status(HttpStatus.BAD_REQUEST)
                            .body(new GenericResponse(null, false, "Malformed format"));
                }
            }

            // storage add files
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GenericResponse(null, true, "")
        );
    }

}
