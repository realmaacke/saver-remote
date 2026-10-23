package com.example.saver.saver_web.services;

import com.example.saver.saver_web.entities.ProjectEntity;
import com.example.saver.saver_web.entities.UserEntity;
import com.example.saver.saver_web.repositories.ProjectRepository;
import com.example.saver.saver_web.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(
            ProjectRepository projectRepository,
            UserRepository userRepository
    ) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public boolean checkIfProjectExists(String username, String projectName) {
        return userRepository.existsByUsernameAndProjects_ProjectName(username, projectName);
    }

    @Transactional
    public ProjectEntity CreateProject(String username, String projectName) {
        Optional<UserEntity> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) return null;

        if (userRepository.existsByUsernameAndProjects_ProjectName(username, projectName)) {
            return null;
        }

        ProjectEntity proj = projectRepository.save(new ProjectEntity(projectName));
        userOpt.get().getProjects().add(proj);
        return proj;
    }

    @Transactional
    public ProjectEntity GetProjectByName(String username, String projectName) {
        return userRepository.findByUsername(username)
                .flatMap(user -> user.getProjects().stream()
                        .filter(p -> p.getProjectName().equals(projectName))
                        .findFirst())
                .orElse(null);
    }

    @Transactional
    public boolean DeleteProject(String username, String projectName) {
        Optional<UserEntity> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) return false;

        Set<ProjectEntity> projects = userOpt.get().getProjects();

        Optional<ProjectEntity> projOpt = projects.stream()
                .filter(proj -> proj.getProjectName().equals(projectName))
                .findFirst();

        if (projOpt.isEmpty()) return false;

        projects.remove(projOpt.get());
        projectRepository.delete(projOpt.get());
        return true;
    }
}
