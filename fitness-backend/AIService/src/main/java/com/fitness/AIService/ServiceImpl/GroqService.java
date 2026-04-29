package com.fitness.AIService.ServiceImpl;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.AIService.model.ChatBot;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.awt.*;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GroqService implements ChatBot {

    private final WebClient.Builder webClientBuilder;

    @Value("${groq.api.key}")
    private String apiKey;

    private final ObjectMapper objectMapper= new ObjectMapper();

    @Override
    public String generate(String prompt) {
        String url = "https://api.groq.com/openai/v1/chat/completions";

        Map<String,Object> requestBody = Map.of(
                "model","llama-3.1-8b-instant",
                "messages", List.of(
                        Map.of(
                                "role","user",
                                "content", prompt
                        )
                )
        );
        String response=webClientBuilder.build()
                .post()
                .uri(url)
                .header("Authorization", "Bearer "+ apiKey)
                .header("content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .timeout(Duration.ofSeconds(6))
                .block();

        try {
            JsonNode root = objectMapper.readTree(response);
            return root.path("choices").get(0)
                    .path("message").path("content").asText();
        } catch (Exception e) {
            throw new RuntimeException("Groq parsing failed");
        }
    }
}
