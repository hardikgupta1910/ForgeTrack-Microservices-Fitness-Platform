package com.fitness.ActivityService.service;

import com.fitness.ActivityService.Enums.ActivityType;
import com.fitness.ActivityService.dto.ActivityHistoryResponse;
import com.fitness.ActivityService.dto.ActivityRequest;
import com.fitness.ActivityService.dto.ActivityResponse;

import java.time.LocalDate;
import java.util.List;

public interface ActivityService {

    ActivityResponse createActivity(ActivityRequest request, String userId);

    List<ActivityResponse> getUserActivities(String userId, String tokenUserId, String role);

    ActivityResponse updateActivity(String id, ActivityRequest request, String userId, String role);

    void deleteActivity(String id, String userId, String role);


    List<ActivityResponse> getAllActivities(String role, int page, int size);

    ActivityHistoryResponse getActivityHistory(String userId, ActivityType type, LocalDate fromDate, LocalDate toDate, int page, int size, String sortBy, String sortDir
    );


}
