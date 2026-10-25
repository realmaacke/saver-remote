package com.example.saver.saver_web.services;

import com.example.saver.saver_web.entities.UserEntity;
import com.example.saver.saver_web.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Long getUserIdByUsername(String username) {
        Optional<UserEntity> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty()) return null;

        UserEntity user = userOpt.get();

        return user.getId();
    }

    public UserEntity getUserByToken(String token) {
        if (token == null || token.isBlank()) return null;
        Optional<UserEntity> userOpt = userRepository.findByTokens_Token(token);
        return userOpt.orElse(null);
    }
}
