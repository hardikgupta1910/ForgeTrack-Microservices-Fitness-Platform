package com.fitness.AIService.ServiceImpl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.AIService.model.ChatBot;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OpenRouterService implements ChatBot {

    private final WebClient.Builder webClientBuilder;

    @Value("${openrouter.api.key}")
    private String ApiKey;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String generate(String prompt) {
        String url = "https://openrouter.ai/api/v1/chat/completions";


        Map<String, Object> requestBody = Map.of(
                "models", List.of(
                        "meta-llama/llama-3.1-8b-instruct"
                ),
                "messages", List.of(
                        Map.of(
                                "role", "user",
                                "content", prompt
                        )
                )
        );
        String response =webClientBuilder.build()
                .post()
                .uri(url)
                .header("Authorization", "Bearer "+ApiKey)
                .header("content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .timeout(Duration.ofSeconds(25))
                .block();

        try {
            JsonNode root = objectMapper.readTree(response);
            return root.path("choices").get(0)
                    .path("message").path("content").asText();
        } catch (Exception e) {
            throw new RuntimeException("OpenRouter parsing failed");
        }
    }
}
