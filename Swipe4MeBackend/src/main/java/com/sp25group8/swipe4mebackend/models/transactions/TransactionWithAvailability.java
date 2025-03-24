package com.sp25group8.swipe4mebackend.models.transactions;

import java.time.LocalDateTime;

public record TransactionWithAvailability(
        // Transaction fields
        Long id,
        Long availabilityId,
        Long buyerId,
        Long sellerId,
        String status,

        // Availability fields
        Long availabilityUserId,
        String location,
        LocalDateTime startTime,
        LocalDateTime endTime) {
}
