


package com.fitness.AIService.controller;

import com.fitness.AIService.Service.RecommendationService;
import com.fitness.AIService.dto.RecommendationResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    private String getUserId(HttpServletRequest request) {
        return (String) request.getAttribute("userId");
    }

    //  USER CAN ONLY SEE HIS OWN DATA
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RecommendationResponseDto>> getUserRecommendations(
            @PathVariable String userId,
            HttpServletRequest request) {

        String tokenUserId = getUserId(request);

        return ResponseEntity.ok(
                recommendationService.getUserRecommendations(userId, tokenUserId)
        );
    }

    //  ALSO LOCK THIS ENDPOINT
    @GetMapping("/activity/{activityId}")
    public ResponseEntity<List<RecommendationResponseDto>> getActivityRecommendations(
            @PathVariable String activityId,
            HttpServletRequest request) {

        String tokenUserId = getUserId(request);

        return ResponseEntity.ok(
                recommendationService.getActivityRecommendations(activityId, tokenUserId)
        );
    }
}

