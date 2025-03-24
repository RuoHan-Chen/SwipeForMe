// Author: Steven Yi
// Time spent: 30 minutes

package com.sp25group8.swipe4mebackend.models.availabilities;

import com.sp25group8.swipe4mebackend.models.enums.DiningLocation;

import java.time.LocalDateTime;

public record AvailabilityJoinResult(
                Long id,
                Long userId,
                DiningLocation location,
                LocalDateTime startTime,
                LocalDateTime endTime,
                String email,
                Double rating,
                String firstName,
                String lastName) {
}
