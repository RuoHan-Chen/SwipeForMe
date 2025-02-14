package com.sp25group8.swipe4mebackend.activeUsers;

import com.sp25group8.swipe4mebackend.models.activeUsers.ActiveUserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
