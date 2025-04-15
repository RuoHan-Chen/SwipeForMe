package com.sp25group8.swipe4mebackend.models.ratings;

import com.sp25group8.swipe4mebackend.models.transactions.TransactionDto;
import com.sp25group8.swipe4mebackend.models.users.UserDto;

public record RatingDto(
    Long rId,
    UserDto seller,
    UserDto buyer,
    TransactionDto transaction,
    Double toSellerRating,
    Double toBuyerRating
) {

    public static RatingDto fromEntity(RatingEntity rating) {
        return new RatingDto(
            rating.getRId(),
            UserDto.fromEntity(rating.getSeller()),
            UserDto.fromEntity(rating.getBuyer()),
            TransactionDto.fromEntity(rating.getTransaction()),
            rating.getToSellerRating(),
            rating.getToBuyerRating()
        );
    }

}
