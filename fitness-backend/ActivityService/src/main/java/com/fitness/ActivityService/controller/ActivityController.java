package com.fitness.ActivityService.controller;


import com.fitness.ActivityService.Enums.ActivityType;
import com.fitness.ActivityService.dto.ActivityHistoryResponse;
import com.fitness.ActivityService.dto.ActivityRequest;
import com.fitness.ActivityService.dto.ActivityResponse;
import com.fitness.ActivityService.service.ActivityService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/activities")
@AllArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    private String getUserId(HttpServletRequest request) {
        System.out.println("USER ID: " + request.getHeader("X-User-Id"));
        return request.getHeader("X-User-Id");
    }

    private String getRole(HttpServletRequest request) {
        System.out.println("ROLE: " + request.getHeader("X-User-Role"));
        return request.getHeader("X-User-Role");
    }

    // CREATE
    @PostMapping
    public ActivityResponse create(@RequestBody ActivityRequest req, HttpServletRequest request) {
        System.out.println("USER ID: " + request.getHeader("X-User-Id"));
        System.out.println("ROLE: " + request.getHeader("X-User-Role"));
        return activityService.createActivity(req, getUserId(request));
    }

    // GET USER ACTIVITIES
    @GetMapping("/user/{userId}")
    public List<ActivityResponse> getUserActivities(@PathVariable String userId, HttpServletRequest request) {

        return activityService.getUserActivities(userId, getUserId(request), getRole(request));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ActivityResponse update(@PathVariable String id, @RequestBody ActivityRequest req, HttpServletRequest request) {

        return activityService.updateActivity(id, req, getUserId(request), getRole(request));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id, HttpServletRequest request) {

        activityService.deleteActivity(id, getUserId(request), getRole(request));

        return "Deleted";
    }

    // ADMIN: GET ALL
//    @GetMapping("/all")
//    public List<ActivityResponse> getAll(HttpServletRequest request) {
//
//        return activityService.getAllActivities(getRole(request));
//    }
    @GetMapping("/all")
    public List<ActivityResponse> getAll(
            HttpServletRequest request,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return activityService.getAllActivities(getRole(request), page, size);
    }


    @GetMapping("/history")
    public ResponseEntity<ActivityHistoryResponse> getActivityHistory(
            HttpServletRequest request,
            @RequestParam(required = false) ActivityType type,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "startTime") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        String userId = getUserId(request);

        return ResponseEntity.ok(
                activityService.getActivityHistory(userId, type, fromDate, toDate, page, size, sortBy, sortDir
                )
        );
    }


}
