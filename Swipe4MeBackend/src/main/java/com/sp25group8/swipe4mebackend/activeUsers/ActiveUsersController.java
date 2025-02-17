package com.sp25group8.swipe4mebackend.activeUsers;

import com.sp25group8.swipe4mebackend.models.activeUsers.ActiveUserEntity;
import com.sp25group8.swipe4mebackend.models.enums.DiningHall;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/active")
@RequiredArgsConstructor
public class ActiveUsersController {

    private final ActiveUsersService activeUsersService;

    @GetMapping
    public ResponseEntity<List<ActiveUserEntity>> getActiveUsers() {
        List<ActiveUserEntity> activeUsers = activeUsersService.getActiveUsers();
        return ResponseEntity.ok(activeUsers);
    }

    @PostMapping
    public ResponseEntity<ActiveUserEntity> addActiveUser(
            @RequestParam Long userId,
            @RequestParam DiningHall location,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime
    ) {
        return ResponseEntity.ok(activeUsersService.createActiveUser(userId, location, startTime, endTime));
    }

    @DeleteMapping
    public ResponseEntity<Void> removeActiveUser(
            @RequestParam Long userId
    ) {
        activeUsersService.removeActiveUser(userId);
        return ResponseEntity.ok().build();
    }

}
