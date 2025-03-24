package com.sp25group8.swipe4mebackend.models.transactions;

import java.time.LocalDateTime;

import com.sp25group8.swipe4mebackend.models.enums.DiningLocation;

public record TransactionWithUsersAndAvailability(
                // Transaction fields
                Long id,
                Long availabilityId,
                Long buyerId,
                Long sellerId,
                TransactionStatus status,

                // Availability fields
                Long availabilityUserId,
                DiningLocation location,
                LocalDateTime startTime,
                LocalDateTime endTime,

                // Buyer fields
                String buyerFirstName,
                String buyerLastName,
                String buyerEmail,
                String buyerPhoneNumber,
                String buyerProfilePicUrl,
                Double buyerRating,

                // Seller fields
                String sellerFirstName,
                String sellerLastName,
                String sellerEmail,
                String sellerPhoneNumber,
                String sellerProfilePicUrl,
                Double sellerRating) {
}
