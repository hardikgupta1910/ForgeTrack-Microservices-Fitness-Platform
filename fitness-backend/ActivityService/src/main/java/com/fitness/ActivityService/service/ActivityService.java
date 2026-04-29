package com.fitness.ActivityService.service;

import com.fitness.ActivityService.dto.ActivityRequest;
import com.fitness.ActivityService.dto.ActivityResponse;

import java.util.List;

public interface ActivityService {
//    ActivityResponse createActivity(ActivityRequest request, String userId);
//    List<ActivityResponse> getActivitiesByUserId(String userId);

    ActivityResponse createActivity(ActivityRequest request, String userId);

    List<ActivityResponse> getUserActivities(String userId, String tokenUserId, String role);

    ActivityResponse updateActivity(String id, ActivityRequest request, String userId, String role);

    void deleteActivity(String id, String userId, String role);

    List<ActivityResponse> getAllActivities(String role);


}
