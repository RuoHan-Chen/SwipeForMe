package com.sp25group8.swipe4mebackend.availability;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;
import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityJoinResult;
import com.sp25group8.swipe4mebackend.models.enums.DiningHall;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AvailabilityService {

    private final AvailabilityRepository availabilityRepository;

    public List<AvailabilityJoinResult> getAvailabilities() {
        return availabilityRepository.findAllAvailabilities();
    }

    public AvailabilityEntity createAvailability(
            Long userId,
            DiningHall location,
            LocalDateTime startTime,
            LocalDateTime endTime
    ) {
        AvailabilityEntity availabilityEntity = new AvailabilityEntity(null, userId, location, startTime, endTime);
        return availabilityRepository.save(availabilityEntity);
    }

    public void removeAvailability(Long userId) {
        availabilityRepository.deleteById(userId);
    }
}
