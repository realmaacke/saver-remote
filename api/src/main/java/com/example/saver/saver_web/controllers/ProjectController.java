package com.example.saver.saver_web.controllers;

import com.example.saver.saver_web.annotations.RequiresAuth;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.example.saver.saver_web.models.ResponseModels.GenericResponse;

@RestController
public class ProjectController {

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


        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GenericResponse(null, true, "")
        );
    }

    @RequiresAuth
    @RequestMapping(value = "/proj/upload/{username}/{project_name}", method = {RequestMethod.POST})
    public ResponseEntity<GenericResponse> uploadToProject(
            @PathVariable String username,
            @PathVariable String project_name
    ) {


        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GenericResponse(null, true, "")
        );
    }

}
