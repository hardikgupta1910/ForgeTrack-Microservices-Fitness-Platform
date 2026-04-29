package com.fitness.AIService.ServiceImpl;

import com.fitness.AIService.Repository.RecommendationRepository;
import com.fitness.AIService.Service.ActivityAIService;
import com.fitness.AIService.model.Recommendation;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.fitness.AIService.dto.ActivityResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityMessageListener {

    private final ActivityAIService activityAIService;
    private final RecommendationRepository recommendationRepository;

    @KafkaListener(topics= "${kafka.topic.name}", groupId="activity-processor-group")
  public void processActivity(ActivityResponse response){

        try {
            System.out.println("hit listener");
            log.info("Processing activity: {}", response.getUserId());

            Recommendation recommendation= activityAIService.generateRecommendations(response);
            recommendationRepository.save(recommendation);
        } catch (Exception e) {

            log.error("Error processing message, skipping: {}", response.getUserId(), e);

        }

  }

}
