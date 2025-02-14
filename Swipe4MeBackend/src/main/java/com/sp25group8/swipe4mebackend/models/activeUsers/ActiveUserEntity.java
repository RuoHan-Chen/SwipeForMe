package com.sp25group8.swipe4mebackend.models.activeUsers;

import com.sp25group8.swipe4mebackend.models.enums.DiningHall;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record ActiveUserEntity(
        @Id Long id,
        Long userId,
        DiningHall location,
        LocalDateTime startTime,
        LocalDateTime endTime
) {
}
