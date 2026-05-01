package com.fitness.ActivityService.serviceImpl;

import com.fitness.ActivityService.Enums.ActivityType;
import com.fitness.ActivityService.dto.ActivityHistoryResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import com.fitness.ActivityService.Repository.ActivityRepository;
import com.fitness.ActivityService.dto.ActivityRequest;
import com.fitness.ActivityService.dto.ActivityResponse;
import com.fitness.ActivityService.model.Activity;
import com.fitness.ActivityService.service.ActivityService;

import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepository;
    private final KafkaTemplate<String, ActivityResponse> kafkaTemplate;
    @Value("${kafka.topic.name}")
    private String topicName;



    @Override
    @Caching(evict = {
            @CacheEvict(value = "activities", key = "#userId"),
            @CacheEvict(value = "activities_all", allEntries = true)
    })
    public ActivityResponse createActivity(ActivityRequest request, String userId) {

        Activity activity = Activity.builder()
                .userId(userId)
                .type(request.getType())
                .duration(request.getDuration())
                .caloriesBurned(request.getCaloriesBurned())
                .startTime(request.getStartTime())
                .additionalMetrics(request.getAdditionalMetrics())
                .build();

        Activity saved = activityRepository.save(activity);

        //  Kafka (non-blocking, best effort)
        try {
            kafkaTemplate.send(topicName, saved.getId(), map(saved));
        } catch (Exception e) {
            log.error("Kafka send failed for activityId={}", saved.getId(), e);
        }

        return map(saved);
    }





    @Cacheable(value = "activities", key = "#p0")
    @Override
    public List<ActivityResponse> getUserActivities(String userId, String tokenUserId, String role) {

        if (!"ROLE_ADMIN".equals(role) && !userId.equals(tokenUserId)) {
            throw new RuntimeException("Access Denied");
        }

        List<Activity> activities = activityRepository.findByUserId(userId);
        List<ActivityResponse> list = new ArrayList<>();

        for (Activity activity : activities) {
            list.add(map(activity));
        }

        return list;
    }



    @Override
    @Caching(evict = {
            @CacheEvict(value = "activity", key = "#id"),
            @CacheEvict(value = "activities", key = "#userId"),
            @CacheEvict(value = "activities_all", allEntries = true)
    })
    public ActivityResponse updateActivity(String id, ActivityRequest req, String userId, String role) {

        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found"));

        if (!"ROLE_ADMIN".equals(role) && !activity.getUserId().equals(userId)) {
            throw new RuntimeException("Access Denied");
        }

        activity.setType(req.getType());
        activity.setDuration(req.getDuration());
        activity.setCaloriesBurned(req.getCaloriesBurned());
        activity.setStartTime(req.getStartTime());
        activity.setAdditionalMetrics(req.getAdditionalMetrics());

        return map(activityRepository.save(activity));
    }

    // ================= DELETE =================
    @Override
    @Caching(evict = {
            @CacheEvict(value = "activity", key = "#id"),
            @CacheEvict(value = "activities", key = "#userId"),
            @CacheEvict(value = "activities_all", allEntries = true)
    })
    public void deleteActivity(String id, String userId, String role) {

        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found"));

        if (!"ROLE_ADMIN".equals(role) && !activity.getUserId().equals(userId)) {
            throw new RuntimeException("Access Denied");
        }

        activityRepository.delete(activity);
    }

//    @Override
//    @Cacheable(value = "activities_all", key = "'all'")

//    public List<ActivityResponse> getAllActivities(String role) {
//
//        if (!"ROLE_ADMIN".equals(role)) {
//            throw new RuntimeException("Only admin allowed");
//        }
//
//        List<Activity> activities = activityRepository.findAll();
//        List<ActivityResponse> list = new ArrayList<>();
//
//        for (int i = 0; i < activities.size(); i++) {
//            list.add(map(activities.get(i)));
//        }
//
//        return list;
//    }

    @Override
    @Cacheable(value = "activities_all", key = "#page + '_' + #size")
    public List<ActivityResponse> getAllActivities(String role, int page, int size) {
        if (!"ROLE_ADMIN".equals(role)) {
            throw new RuntimeException("Only admin allowed");
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Activity> activityPage = activityRepository.findAll(pageable);

        List<Activity> activities = activityPage.getContent();
        List<ActivityResponse> responseList = new ArrayList<>(activities.size());

        for (int i = 0; i < activities.size(); i++) {
            responseList.add(map(activities.get(i)));
        }

        return responseList;
    }

    private ActivityResponse map(Activity a) {

        ActivityResponse r = new ActivityResponse();

        r.setId(a.getId());
        r.setUserId(a.getUserId());
        r.setType(a.getType());
        r.setDuration(a.getDuration());
        r.setCaloriesBurned(a.getCaloriesBurned());
        r.setStartTime(a.getStartTime());
        r.setAdditionalMetrics(a.getAdditionalMetrics());
        r.setCreatedAt(a.getCreatedAt());
        r.setUpdatedAt(a.getUpdatedAt());

        return r;
    }

    @Override
    public ActivityHistoryResponse getActivityHistory(
            String userId,
            ActivityType type,
            LocalDate fromDate,
            LocalDate toDate,
            int page,
            int size,
            String sortBy,
            String sortDir
    ) {

        List<String> allowedSortFields = List.of("startTime", "createdAt", "duration", "caloriesBurned");
        if (!allowedSortFields.contains(sortBy)) {
            sortBy = "startTime";
        }

        Sort.Direction direction = "asc".equalsIgnoreCase(sortDir)
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        Page<Activity> activityPage;

        boolean hasType = type != null;
        boolean hasDateRange = fromDate != null && toDate != null;

        if (hasType && hasDateRange) {
            LocalDateTime from = fromDate.atStartOfDay();
            LocalDateTime to = toDate.atTime(LocalTime.MAX);

            activityPage = activityRepository.findByUserIdAndTypeAndStartTimeBetween(
                    userId, type, from, to, pageable
            );
        } else if (hasType) {
            activityPage = activityRepository.findByUserIdAndType(userId, type, pageable);
        } else if (hasDateRange) {
            LocalDateTime from = fromDate.atStartOfDay();
            LocalDateTime to = toDate.atTime(LocalTime.MAX);

            activityPage = activityRepository.findByUserIdAndStartTimeBetween(
                    userId, from, to, pageable
            );
        } else {
            activityPage = activityRepository.findByUserId(userId, pageable);
        }

        List<Activity> activities = activityPage.getContent();
        List<ActivityResponse> items = new ArrayList<>();

        for (int i = 0; i < activities.size(); i++) {
            items.add(map(activities.get(i)));
        }

        return ActivityHistoryResponse.builder()
                .content(items)
                .page(activityPage.getNumber())
                .size(activityPage.getSize())
                .totalElements(activityPage.getTotalElements())
                .totalPages(activityPage.getTotalPages())
                .last(activityPage.isLast())
                .build();
    }

}
