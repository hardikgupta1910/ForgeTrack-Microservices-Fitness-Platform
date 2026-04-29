package com.fitness.AIService.Service;

import com.fitness.AIService.dto.ActivityResponse;
import com.fitness.AIService.model.Recommendation;

public interface ActivityAIService {

    public Recommendation generateRecommendations(ActivityResponse response);
    public String chat(String question);
}
