package com.fitness.AIService.controller;

import com.fitness.AIService.Service.ActivityAIService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class ChatController {

    private final ActivityAIService activityAIService;

    @PostMapping("/chat")
    public ResponseEntity<String> chat(@RequestBody Map<String, String> request,
                                       HttpServletRequest req) {

        if (req.getAttribute("userId") == null) {
            throw new RuntimeException("Unauthorized");
        }

        return ResponseEntity.ok(
                activityAIService.chat(request.get("question"))
        );
    }

    @GetMapping("/test")
    public String test(HttpServletRequest request) {
        return "User: " + request.getAttribute("userId") +
                " Role: " + request.getAttribute("role");
    }
}
