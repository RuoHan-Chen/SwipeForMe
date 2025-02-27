package com.sp25group8.swipe4mebackend.models.availabilities;

import com.sp25group8.swipe4mebackend.models.enums.DiningHall;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("availabilities")
public record AvailabilityEntity(
        @Id Long id,
        Long userId,
        DiningHall location,
        LocalDateTime startTime,
        LocalDateTime endTime
) {
}
