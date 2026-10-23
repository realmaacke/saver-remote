package com.example.saver.saver_web.repositories;

import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.saver.saver_web.entities.UserEntity;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);
    boolean existsByUsername(String username);

    /** True if the user is linked to a project with this name. **/
    boolean existsByUsernameAndProjects_ProjectName(String username, String projectName);
}