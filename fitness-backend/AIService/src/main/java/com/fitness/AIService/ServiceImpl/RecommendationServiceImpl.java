package com.fitness.AIService.ServiceImpl;

import com.fitness.AIService.Enums.ActivityType;
import com.fitness.AIService.Repository.RecommendationRepository;
import com.fitness.AIService.Service.RecommendationService;
import com.fitness.AIService.dto.RecommendationResponseDto;
import com.fitness.AIService.model.Recommendation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationServiceImpl implements RecommendationService {

    private final RecommendationRepository recommendationRepository;


    @Override
    public List<RecommendationResponseDto> getUserRecommendations(
            String userId,
            String tokenUserId) {

        if (!userId.equals(tokenUserId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access Denied");
        }

        List<Recommendation> recommendations =
                recommendationRepository.findByUserId(userId);

        List<RecommendationResponseDto> response = new ArrayList<>();

        for (Recommendation rec : recommendations) {
            response.add(toDTO(rec));
        }

        return response;
    }




    @Override
    public List<RecommendationResponseDto> getActivityRecommendations(
            String activityId,
            String tokenUserId) {

        List<Recommendation> recommendations =
                recommendationRepository.findByActivityId(activityId);

        if (recommendations.isEmpty()) {
            throw new RuntimeException("No recommendation found");
        }

        // 🔒 CHECK OWNER
        if (!recommendations.get(0).getUserId().equals(tokenUserId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access Denied");
        }

        List<RecommendationResponseDto> response = new ArrayList<>();

        for (Recommendation rec : recommendations) {
            response.add(toDTO(rec));
        }

        return response;
    }
    public RecommendationResponseDto toDTO(Recommendation entity) {

        return RecommendationResponseDto.builder()
                .activityId(entity.getActivityId())
                .userId(entity.getUserId())
                .activityType(ActivityType.valueOf(entity.getActivityType()))
                .analysis(entity.getAnalysis())
                .improvements(entity.getImprovements())
                .suggestions(entity.getSuggestions())
                .safety(entity.getSafety())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
