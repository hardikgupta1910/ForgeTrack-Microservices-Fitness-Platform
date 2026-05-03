package com.fitness.ActivityService.dto;

import com.fitness.ActivityService.Enums.ActivityType;
import lombok.Data;


import java.time.LocalDateTime;
import java.util.Map;

@Data
public class ActivityRequest {


    private ActivityType type;
    private Integer duration;
    private Integer caloriesBurned;
    private LocalDateTime startTime;
    private Map<String, Object> additionalMetrics;

}
