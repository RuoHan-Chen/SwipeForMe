package com.sp25group8.swipe4mebackend.models.errors;

public record ErrorResponse(
        String error,
        String cause,
        String trace
) {
}
