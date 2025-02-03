package com.sp25group8.swipe4mebackend.users;

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

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @GetMapping()
    public String hello() {
        return "Hello World!";
    }

    @PostMapping("/register")
    public UserEntity registerUser(@RequestBody RegisterBody registerBody) {
        return userService.createUser(
                registerBody.firstName(),
                registerBody.lastName(),
                registerBody.email(),
                registerBody.phoneNumber()
        );
    }

    @GetMapping("/me")
    public ResponseEntity<UserEntity> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

}
