// Author: Steven Yi
// Time spent: 1 hour

package com.sp25group8.swipe4mebackend.availability;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;
import com.sp25group8.swipe4mebackend.models.enums.DiningLocation;
import com.sp25group8.swipe4mebackend.users.UserRepository;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AvailabilityService {

    private final AvailabilityRepository availabilityRepository;
    private final UserRepository userRepository;

    public List<AvailabilityEntity> getAvailabilities() {
        return availabilityRepository.findAll();
    }

    public List<AvailabilityEntity> getAvailabilitiesByUserId(Long userId) {
        return availabilityRepository.findAllByUserId(userId);
    }

    public AvailabilityEntity createAvailability(
            Long userId,
            DiningLocation location,
            LocalDateTime startTime,
            LocalDateTime endTime) {

        UserEntity user = userRepository.findById(userId).orElseThrow();

        AvailabilityEntity availabilityEntity = new AvailabilityEntity(null, user, location, startTime, endTime);
        return availabilityRepository.save(availabilityEntity);
    }

    public void removeAvailability(Long userId) {
        availabilityRepository.deleteById(userId);
    }
}
