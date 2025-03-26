// Author: Steven Yi
// Time spent: 1 hour

package com.sp25group8.swipe4mebackend.availability;

import com.sp25group8.swipe4mebackend.emails.EmailService;
import com.sp25group8.swipe4mebackend.exceptions.AvailabilityNotFoundException;
import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityDto;
import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;
import com.sp25group8.swipe4mebackend.models.enums.DiningLocation;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionEntity;
import com.sp25group8.swipe4mebackend.users.UserRepository;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AvailabilityService {

    private final AvailabilityRepository availabilityRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

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

        AvailabilityEntity availabilityEntity = AvailabilityEntity.builder()
                .user(user)
                .location(location)
                .startTime(startTime)
                .endTime(endTime)
                .build();
        return AvailabilityDto.fromEntity(availabilityRepository.save(availabilityEntity));
    }

    @Transactional
    public void removeAvailability(Long availabilityId) {
        // Fetch the availability with its transactions
        AvailabilityEntity availability = availabilityRepository.findById(availabilityId)
                .orElseThrow(AvailabilityNotFoundException::new);

        // Get all buyers before deleting
        List<UserEntity> buyers = availability.getTransactions().stream()
                .map(TransactionEntity::getBuyer)
                .distinct()
                .collect(Collectors.toList());

        // Delete the availability (transactions will cascade delete)
        availabilityRepository.deleteById(availabilityId);

        // Send emails to all buyers
        for (UserEntity buyer : buyers) {
            emailService.sendAvailabilityDeletedEmail(availability, buyer.getEmail());
        }
    }
}
