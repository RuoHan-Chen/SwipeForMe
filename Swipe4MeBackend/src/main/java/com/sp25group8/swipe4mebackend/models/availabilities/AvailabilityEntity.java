// Author: Steven Yi
// Time spent: 1 minute

package com.sp25group8.swipe4mebackend.models.availabilities;

import com.sp25group8.swipe4mebackend.models.enums.DiningLocation;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("availabilities")
public record AvailabilityEntity(
                @Id Long id,
                Long userId,
                DiningLocation location,
                LocalDateTime startTime,
                LocalDateTime endTime) {
}
