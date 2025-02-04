package com.sp25group8.swipe4mebackend.exceptions.models;

public record ErrorResponse(
        String error,
        String message
) {
}
