package com.sp25group8.swipe4mebackend.models.authentication;

public record LoginResponse(
        String token,
        Long userId
) {
}
