package com.sp25group8.swipe4mebackend.models.transactions;

public record CreateTransactionDto(
        Long availabilityId,
        Long buyerId,
        Long sellerId,
        TransactionStatus status) {

}
