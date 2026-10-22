package com.example.saver.saver_web.services;

import com.example.saver.saver_web.entities.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;


@Service
public class JwtService {
    private final SecretKey secretKey;
    private final long expirationMs;

    public JwtService(
            @Value("${jwt.secret:defaultSuperSecretKeyThatIsAtLeast256BitsLongAndSecure123!}") String secret,
            @Value("${jwt.expiration-ms:86400000}") long expirationMs // Default 24 hours
    ) {
        // HMAC-SHA256 requires keys at least 256 bits (32 bytes) long
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    public String userToToken(UserEntity user) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .subject(user.getId().toString())
                .claim("username", user.getUsername())
                .issuedAt(now)
                .expiration(expirationDate)
                .signWith(this.secretKey)
                .compact();
    }

    public Claims parseToken(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (JwtException | IllegalArgumentException e) {
            // Token is expired, tampered with, or malformed
            return null;
        }
    }

    public boolean validateToken(String token) {
        return this.parseToken(token) != null;
    }
}
