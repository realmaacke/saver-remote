package com.example.saver.saver_web.repositories;

import com.example.saver.saver_web.entities.UsersToTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserToTokenRepository extends JpaRepository<UsersToTokenEntity, String> {
    void deleteByUserId(Long userId);   // needs @Transactional on the caller
}