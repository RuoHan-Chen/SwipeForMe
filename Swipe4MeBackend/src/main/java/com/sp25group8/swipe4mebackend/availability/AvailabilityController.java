// Author: Steven Yi
// Time spent: 1 hours

package com.sp25group8.swipe4mebackend.availability;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;
import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityJoinResult;
import com.sp25group8.swipe4mebackend.models.enums.DiningHall;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/availabilities")
@RequiredArgsConstructor
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    @GetMapping
    public ResponseEntity<List<AvailabilityJoinResult>> getAllAvailabilities() {
        List<AvailabilityJoinResult> availabilities = availabilityService.getAvailabilities();
        return ResponseEntity.ok(availabilities);
    }

    @PostMapping
    public ResponseEntity<AvailabilityEntity> addAvailability(
            @RequestParam Long userId,
            @RequestParam DiningHall location,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime
    ) {
        return ResponseEntity.ok(availabilityService.createAvailability(userId, location, startTime, endTime));
    }

    @DeleteMapping
    public ResponseEntity<Void> removeAvailability(
            @RequestParam Long userId
    ) {
        availabilityService.removeAvailability(userId);
        return ResponseEntity.ok().build();
    }

}
