package com.sp25group8.swipe4mebackend.models.activeUsers;

import com.sp25group8.swipe4mebackend.models.enums.DiningHall;

import java.time.LocalDateTime;

public record ActiveUserJoinResult(
        Long id,
        Long userId,
        DiningHall location,
        LocalDateTime startTime,
        LocalDateTime endTime,
        String email,
        Double rating,
        String firstName,
        String lastName
) {
}
