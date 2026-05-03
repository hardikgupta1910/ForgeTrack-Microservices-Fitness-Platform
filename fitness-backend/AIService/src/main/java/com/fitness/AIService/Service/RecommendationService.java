package com.fitness.AIService.Service;

import com.fitness.AIService.dto.RecommendationResponseDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface RecommendationService {



    List<RecommendationResponseDto> getUserRecommendations(
            String userId,
            String tokenUserId);

    List<RecommendationResponseDto> getActivityRecommendations(
            String activityId,
            String tokenUserId);
}
