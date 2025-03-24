package com.sp25group8.swipe4mebackend.models.transactions;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;
import com.sp25group8.swipe4mebackend.models.dtos.UserDto;

public record DetailedTransactionResponse(
                TransactionEntity transaction,
                AvailabilityEntity availability,
                UserDto buyer,
                UserDto seller) {

        public DetailedTransactionResponse(
                        TransactionWithUsersAndAvailability transactionWithUsersAndAvailability) {

                this(
                                new TransactionEntity(
                                                transactionWithUsersAndAvailability.id(),
                                                transactionWithUsersAndAvailability.availabilityId(),
                                                transactionWithUsersAndAvailability.buyerId(),
                                                transactionWithUsersAndAvailability.sellerId(),
                                                transactionWithUsersAndAvailability.status()),
                                new AvailabilityEntity(
                                                transactionWithUsersAndAvailability.availabilityId(),
                                                transactionWithUsersAndAvailability.availabilityUserId(),
                                                transactionWithUsersAndAvailability.location(),
                                                transactionWithUsersAndAvailability.startTime(),
                                                transactionWithUsersAndAvailability.endTime()),
                                new UserDto(
                                                transactionWithUsersAndAvailability.buyerId(),
                                                transactionWithUsersAndAvailability.buyerFirstName(),
                                                transactionWithUsersAndAvailability.buyerLastName(),
                                                transactionWithUsersAndAvailability.buyerEmail(),
                                                transactionWithUsersAndAvailability.buyerPhoneNumber(),
                                                transactionWithUsersAndAvailability.buyerRating(),
                                                transactionWithUsersAndAvailability.buyerProfilePicUrl()),
                                new UserDto(
                                                transactionWithUsersAndAvailability.sellerId(),
                                                transactionWithUsersAndAvailability.sellerFirstName(),
                                                transactionWithUsersAndAvailability.sellerLastName(),
                                                transactionWithUsersAndAvailability.sellerEmail(),
                                                transactionWithUsersAndAvailability.sellerPhoneNumber(),
                                                transactionWithUsersAndAvailability.sellerRating(),
                                                transactionWithUsersAndAvailability.sellerProfilePicUrl()));
        }

}
