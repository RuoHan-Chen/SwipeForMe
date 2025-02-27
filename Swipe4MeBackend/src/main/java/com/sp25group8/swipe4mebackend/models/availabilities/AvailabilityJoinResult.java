package com.sp25group8.swipe4mebackend.models.availabilities;

import com.sp25group8.swipe4mebackend.models.enums.DiningHall;

import java.time.LocalDateTime;

public record AvailabilityJoinResult(
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
