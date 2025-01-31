package com.sp25group8.swipe4mebackend.users;

import com.sp25group8.swipe4mebackend.users.models.RegisterBody;
import com.sp25group8.swipe4mebackend.users.models.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

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
}
