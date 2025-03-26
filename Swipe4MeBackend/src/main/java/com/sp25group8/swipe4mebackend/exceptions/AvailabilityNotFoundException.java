package com.sp25group8.swipe4mebackend.exceptions;

public class AvailabilityNotFoundException extends RuntimeException {
    public AvailabilityNotFoundException() {
        super("Availability not found");
    }
}
