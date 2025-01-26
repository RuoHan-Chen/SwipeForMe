package com.sp25group8.swipe4mebackend.users;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping()
    public String hello() {
        return "Hello World!";
    }

}
