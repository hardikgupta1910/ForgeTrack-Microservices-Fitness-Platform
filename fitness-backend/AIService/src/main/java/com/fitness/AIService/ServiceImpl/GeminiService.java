package com.fitness.AIService.ServiceImpl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.AIService.model.ChatBot;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GeminiService implements ChatBot {

    private final WebClient.Builder webClientBuilder;

    @Value("${gemini.api.key}")
    private String apiKey;
    @Value("${gemini.api.url}")
    private String url;

    private final ObjectMapper objectMapper=new ObjectMapper();

    @Override
    public String generate(String prompt) {
        Map<String,Object> requestBody= Map.of(
                "contents",List.of(
                        Map.of(
                                "parts",List.of(
                                    Map.of("text", prompt)
                                )
                )       )
        );

        String response=webClientBuilder.build()
                .post()
                .uri(url+"?key="+apiKey)
                .header("content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .timeout(Duration.ofSeconds(10))
                .block();
        try {
            JsonNode root = objectMapper.readTree(response);
            return root.path("candidates").get(0)
                    .path("content").path("parts").get(0)
                    .path("text").asText();
        } catch (Exception e) {
            throw new RuntimeException("Gemini parsing failed");
        }
    }
}
