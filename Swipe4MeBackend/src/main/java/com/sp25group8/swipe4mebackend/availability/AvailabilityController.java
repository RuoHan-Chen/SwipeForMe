// Author: Steven Yi
// Time spent: 1 hours

package com.sp25group8.swipe4mebackend.availability;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityDto;
import com.sp25group8.swipe4mebackend.models.enums.DiningLocation;
import com.sp25group8.swipe4mebackend.models.users.UserDto;

import lombok.RequiredArgsConstructor;

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

    @GetMapping("/{availabilityId}/users")
    public ResponseEntity<List<UserDto>> getUsersByAvailabilityId(@PathVariable Long availabilityId) {
        List<UserDto> users = availabilityService.getUsersByAvailabilityId(availabilityId);
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<AvailabilityDto> addAvailability(
            @RequestParam Long userId,
            @RequestParam DiningLocation location,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        return ResponseEntity.ok(availabilityService.createAvailability(userId, location, startTime, endTime));
    }

    @PutMapping("/{availabilityId}")
    public ResponseEntity<AvailabilityDto> updateAvailability(
            @PathVariable Long availabilityId,
            @RequestParam DiningLocation location,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        return ResponseEntity.ok(availabilityService.updateAvailability(availabilityId, location, startTime, endTime));
    }

    @DeleteMapping("/{availabilityId}")
    public ResponseEntity<Void> removeAvailability(@PathVariable Long availabilityId) {
        availabilityService.removeAvailability(availabilityId);
        return ResponseEntity.ok().build();
    }

}
