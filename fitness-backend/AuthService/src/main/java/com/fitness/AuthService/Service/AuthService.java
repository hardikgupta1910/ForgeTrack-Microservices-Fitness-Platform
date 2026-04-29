package com.fitness.AuthService.Service;

import com.fitness.AuthService.DTO.LoginRequest;
import com.fitness.AuthService.DTO.authUserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class AuthService {


    private final WebClient.Builder webClientBuilder;
    private final authJwtUtil authjwtUtil;

    public String login(LoginRequest request) {

        authUserResponse user = webClientBuilder.build()
                .post()
                .uri("http://USER-SERVICE/api/users/validate-login")
                .bodyValue(request)
                .retrieve()
                .onStatus(
                        status -> status.is4xxClientError(),
                        response -> {
                            throw new RuntimeException("Invalid credentials");
                        }
                )
                .bodyToMono(authUserResponse.class)
                .block();
        System.out.println("USER RESPONSE: " + user);
        System.out.println("Calling USER SERVICE...");

        // thjis generate token with role
        return authjwtUtil.generateToken(
                user.getEmail(),
                user.getId(),
                user.getRole() != null ? user.getRole() : "ROLE_USER"

        );
    }
}
