package com.sp25group8.swipe4mebackend.transactions.models;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record TransactionEntity(
        @Id
        Long id,
        DiningHall location,
        LocalDateTime timestamp,
        Long buyerId,
        Long sellerId,
        TransactionStatus status
) {
}
