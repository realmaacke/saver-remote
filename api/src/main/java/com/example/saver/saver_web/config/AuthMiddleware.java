package com.example.saver.saver_web.config;

import com.example.saver.saver_web.annotations.RequiresAuth;
import com.example.saver.saver_web.models.ResponseModels;
import com.example.saver.saver_web.services.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import tools.jackson.databind.ObjectMapper;

@Component
public class AuthMiddleware implements HandlerInterceptor {
    private static final String bearerPrefix = "Bearer ";
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private final JwtService jwtService;

    public AuthMiddleware(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler) throws Exception {
        // skips if not reaching relevant endpoint
        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }

        // check if method got annotation
        boolean isProtected =
                handlerMethod.hasMethodAnnotation(RequiresAuth.class) ||
                handlerMethod.getBeanType().isAnnotationPresent(RequiresAuth.class);

        if (!isProtected) return true;

        String authHeader = req.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith(bearerPrefix)) {
            sendUnauthorizedResponse(res, "Missing or malformed bearer token");
        }

        String token = authHeader.substring(bearerPrefix.length()).trim();

        if (token.isEmpty()) {
            sendUnauthorizedResponse(res, "token cant be empty");
            return false;
        }

        Claims claims = jwtService.parseToken(token);

        if (claims == null) {
            sendUnauthorizedResponse(res, "Invalid or expired token");
            return false;
        }
        return true;
    }

    private void sendUnauthorizedResponse(HttpServletResponse res, String message) throws Exception {
        res.setStatus(HttpStatus.UNAUTHORIZED.value());
        res.setContentType("application/json");

        ResponseModels.GenericResponse responseBody = new ResponseModels.GenericResponse(
                null,
                false,
                message
        );

        // Serialize Java record cleanly to JSON string using Jackson
        res.getWriter().write(OBJECT_MAPPER.writeValueAsString(responseBody));
    }
}
