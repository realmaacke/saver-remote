package com.example.saver.saver_web.repositories;

import com.example.saver.saver_web.entities.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {
    Optional<ProjectEntity> findByProjectName(String projectName);
    boolean existsByProjectName(String projectName);
}
