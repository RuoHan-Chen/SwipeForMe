package com.sp25group8.swipe4mebackend.transactions.models;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionEntity {
    private Long id;
    private Long buyerId;
    private Long sellerId;
    private int mealSwipes;
    private double price;
    private TransactionStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
