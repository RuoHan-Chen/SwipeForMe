// Author: Xinying Luo
// Time spent: 1 hour

package com.sp25group8.swipe4mebackend.ratings;

import com.sp25group8.swipe4mebackend.models.ratings.RatingEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;

    // find the user's rating according to its user
    public double getUserRating(Long userId) {
        List<RatingEntity> ratingsAsSeller = ratingRepository.findAllBySellerId(userId);
        List<RatingEntity> ratingsAsBuyer = ratingRepository.findAllByBuyerId(userId);

        int numEntries = ratingsAsBuyer.size() + ratingsAsSeller.size();
        if (numEntries == 0)
            return -1;

        Double sum = 0.0;
        for (RatingEntity ratingEntity : ratingsAsSeller) {
            sum += ratingEntity.getToSellerRating(); // getter method
        }

        for (RatingEntity ratingEntity : ratingsAsBuyer) {
            sum += ratingEntity.getToBuyerRating();
        }

        return sum / numEntries;
    }

}
