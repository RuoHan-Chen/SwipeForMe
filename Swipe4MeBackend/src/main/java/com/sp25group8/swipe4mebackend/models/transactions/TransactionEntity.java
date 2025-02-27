package com.sp25group8.swipe4mebackend.models.transactions;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("transactions")
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
