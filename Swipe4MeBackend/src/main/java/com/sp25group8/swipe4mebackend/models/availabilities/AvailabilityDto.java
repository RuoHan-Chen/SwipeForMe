package com.sp25group8.swipe4mebackend.models.availabilities;

import java.time.LocalDateTime;

import com.sp25group8.swipe4mebackend.models.enums.DiningLocation;
import com.sp25group8.swipe4mebackend.models.users.UserDto;

public record AvailabilityDto(
        Long id,
        UserDto user,
        DiningLocation location,
        LocalDateTime startTime,
        LocalDateTime endTime) {

    public static AvailabilityDto fromEntity(AvailabilityEntity availability) {
        return new AvailabilityDto(
                availability.getId(),
                UserDto.fromEntity(availability.getUser()),
                availability.getLocation(),
                availability.getStartTime(),
                availability.getEndTime());
    }

}
