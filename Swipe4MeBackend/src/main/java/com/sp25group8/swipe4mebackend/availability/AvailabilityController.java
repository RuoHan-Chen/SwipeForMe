// Author: Steven Yi
// Time spent: 1 hours

package com.sp25group8.swipe4mebackend.availability;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityDto;
import com.sp25group8.swipe4mebackend.models.enums.DiningLocation;
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
    public ResponseEntity<List<AvailabilityDto>> getAllAvailabilities() {
        List<AvailabilityDto> availabilities = availabilityService.getAvailabilities();
        return ResponseEntity.ok(availabilities);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AvailabilityDto>> getAvailabilitiesByUserId(@PathVariable Long userId) {
        List<AvailabilityDto> availabilities = availabilityService.getAvailabilitiesByUserId(userId);
        return ResponseEntity.ok(availabilities);
    }

    @PostMapping
    public ResponseEntity<AvailabilityDto> addAvailability(
            @RequestParam Long userId,
            @RequestParam DiningLocation location,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        return ResponseEntity.ok(availabilityService.createAvailability(userId, location, startTime, endTime));
    }

    @DeleteMapping("/{availabilityId}")
    public ResponseEntity<Void> removeAvailability(@PathVariable Long availabilityId) {
        availabilityService.removeAvailability(availabilityId);
        return ResponseEntity.ok().build();
    }

}
