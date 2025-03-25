// Author: Steven Yi
// Time spent: 1 hour

package com.sp25group8.swipe4mebackend.availability;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityDto;
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

    public List<AvailabilityDto> getAvailabilities() {
        return availabilityRepository.findAll().stream().map(AvailabilityDto::fromEntity).toList();
    }

    public List<AvailabilityDto> getAvailabilitiesByUserId(Long userId) {
        return availabilityRepository.findAllByUserId(userId).stream().map(AvailabilityDto::fromEntity).toList();
    }

    public AvailabilityDto createAvailability(
            Long userId,
            DiningLocation location,
            LocalDateTime startTime,
            LocalDateTime endTime) {

        UserEntity user = userRepository.findById(userId).orElseThrow();

        AvailabilityEntity availabilityEntity = new AvailabilityEntity(null, user, location, startTime, endTime);
        return AvailabilityDto.fromEntity(availabilityRepository.save(availabilityEntity));
    }

    public void removeAvailability(Long userId) {
        availabilityRepository.deleteById(userId);
    }
}
