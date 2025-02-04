package com.sp25group8.swipe4mebackend.users;

import com.sp25group8.swipe4mebackend.users.dtos.UserDto;
import com.sp25group8.swipe4mebackend.users.models.RegisterBody;
import com.sp25group8.swipe4mebackend.users.models.UserEntity;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

}
