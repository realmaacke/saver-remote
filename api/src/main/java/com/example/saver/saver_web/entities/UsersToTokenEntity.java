package com.example.saver.saver_web.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "users_to_token")
public class UsersToTokenEntity {
    @Id
    @Column(name = "token")
    private String token;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "last_renewed", nullable = false)
    private LocalDateTime lastRenewed;

    protected UsersToTokenEntity() {}

    public UsersToTokenEntity(String token, Long userId) {
        this.token = token;
        this.userId = userId;
        this.lastRenewed = LocalDateTime.now();
    }

    public String getToken() { return token; }
    public Long getUserId() { return userId; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getLastRenewed() { return lastRenewed; }
    public void setLastRenewed(LocalDateTime lastRenewed) { this.lastRenewed = lastRenewed; }
}