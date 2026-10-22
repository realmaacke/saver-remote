package com.example.saver.saver_web.dto;

import com.example.saver.saver_web.entities.UserEntity;

public record UserDTO(
        Long id,
        String username
) {
    public static UserDTO fromEntity(UserEntity entity) {
        return new UserDTO(
                entity.getId(),
                entity.getUsername()
        );
    }
}