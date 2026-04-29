package com.fitness.AIService.dto;


import com.fitness.AIService.Enums.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import lombok.Builder;


@Data
@Builder
@AllArgsConstructor
public class RecommendationResponseDto {
    private String activityId;
    private String userId;
//    private String recommendation;
    private ActivityType activityType ;
private Map<String, String> analysis;

    private List<Map<String, String>> improvements;

    private List<Map<String, String>> suggestions;

    private List<String> safety;

    private LocalDateTime createdAt;
}
