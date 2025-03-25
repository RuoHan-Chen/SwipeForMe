package com.sp25group8.swipe4mebackend.models.transactions;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityDto;
import com.sp25group8.swipe4mebackend.models.users.UserDto;

public record TransactionDto(
        Long id,
        AvailabilityDto availability,
        UserDto buyer,
        UserDto seller,
        TransactionStatus status) {

    public static TransactionDto fromEntity(TransactionEntity transaction) {
        return new TransactionDto(
                transaction.getId(),
                AvailabilityDto.fromEntity(transaction.getAvailability()),
                UserDto.fromEntity(transaction.getBuyer()),
                UserDto.fromEntity(transaction.getSeller()),
                transaction.getStatus());
    }
}
