package com.fitness.ActivityService.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class activityJwtAuthFilter extends OncePerRequestFilter {

    private final activityJwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain)
            throws ServletException, IOException {

        String path = req.getRequestURI();

        // allow actuator
        if (path.startsWith("/actuator")) {
            chain.doFilter(req, res);
            return;
        }

        String header = req.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.getWriter().write("Missing token");
            return;
        }

        String token = header.substring(7);

        if (!jwtUtil.validate(token)) {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.getWriter().write("Invalid token");
            return;
        }

        String userId = jwtUtil.extractUserId(token);
        String role = jwtUtil.extractRole(token);

        req.setAttribute("userId", userId);
        req.setAttribute("role", role);

        chain.doFilter(req, res);
    }
}