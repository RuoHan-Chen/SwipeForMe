package com.sp25group8.swipe4mebackend.models.transactions;

import java.time.LocalDateTime;

public record TransactionWithAvailabilityAndUser(
                // Transaction fields
                Long id,
                Long availabilityId,
                Long buyerId,
                Long sellerId,
                TransactionStatus status,

                // Availability fields
                Long availabilityUserId,
                String location,
                LocalDateTime startTime,
                LocalDateTime endTime,

                // User fields
                String firstName,
                String lastName,
                String email,
                String phoneNumber,
                String profilePicUrl) {
}
