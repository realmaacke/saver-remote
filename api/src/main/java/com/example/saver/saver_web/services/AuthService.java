package com.example.saver.saver_web.services;

import com.example.saver.saver_web.dto.UserDTO;
import com.example.saver.saver_web.entities.UserEntity;
import com.example.saver.saver_web.models.RequestModels;
import com.example.saver.saver_web.models.ResponseModels;
import com.example.saver.saver_web.repositories.UserRepository;
import org.springframework.stereotype.Service;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{3,16}$");

    private final Argon2 argon = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);

    public AuthService(UserRepository userRepository, JwtService jwtService) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public String connectUser(String username, String password) {
        Optional<UserEntity> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) return null;

        UserEntity user = userOpt.get();
        char[] passwordChars = password.toCharArray();

        try {
            if (!argon.verify(user.getPassword(), passwordChars)) {
                return null;
            }
        } finally {
            argon.wipeArray(passwordChars);
        }

        return jwtService.userToToken(user);
    }

    public UserDTO createUser(String username, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("username already taken");
        }

        String hashedPass = this.hashPassword(password);
        UserEntity newUser = userRepository.save(new UserEntity(username, hashedPass));

        return UserDTO.fromEntity(newUser);
    }

    public boolean validPassword(String password) {
        return password != null && PASSWORD_PATTERN.matcher(password).matches();
    }

    public String hashPassword(String password) {
        char[] rawPassword = password.toCharArray();
        try {
            return argon.hash(3, 65536, 1, rawPassword);
        } finally {
            argon.wipeArray(rawPassword);
        }
    }
}
