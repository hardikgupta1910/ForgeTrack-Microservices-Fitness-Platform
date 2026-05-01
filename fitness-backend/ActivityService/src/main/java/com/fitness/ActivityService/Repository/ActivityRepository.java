package com.fitness.ActivityService.Repository;

import com.fitness.ActivityService.Enums.ActivityType;
import com.fitness.ActivityService.model.Activity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActivityRepository extends MongoRepository<Activity, String> {
    List<Activity> findByUserId(String userId);
    Page<Activity> findAll(Pageable pageable);

    Page<Activity> findByUserId(String userId, Pageable pageable);

    Page<Activity> findByUserIdAndType(String userId, ActivityType type, Pageable pageable);

    Page<Activity> findByUserIdAndStartTimeBetween(
            String userId,
            LocalDateTime from,
            LocalDateTime to,
            Pageable pageable
    );

    Page<Activity> findByUserIdAndTypeAndStartTimeBetween(
            String userId,
            ActivityType type,
            LocalDateTime from,
            LocalDateTime to,
            Pageable pageable
    );
}
