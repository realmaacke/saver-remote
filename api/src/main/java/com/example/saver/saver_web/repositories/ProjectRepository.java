package com.example.saver.saver_web.repositories;

import com.example.saver.saver_web.entities.ProjectEntity;
import com.example.saver.saver_web.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {
    Optional<ProjectEntity> findByprojectName(String projectName);

}