// Author: Xinying Luo
// Time spent: 1 hour

package com.sp25group8.swipe4mebackend.ratings;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sp25group8.swipe4mebackend.models.ratings.RatingEntity;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;

    // find the user's rating according to its user
    public double getUserRating(Long userId) {
        List<RatingEntity> ratingsAsSeller = ratingRepository.findAllBySeller_Id(userId);
        List<RatingEntity> ratingsAsBuyer = ratingRepository.findAllByBuyer_Id(userId);

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

    // 创建新的评分
    public RatingEntity createRating(RatingEntity rating) {
        return ratingRepository.save(rating);
    }

    // 更新评分
    public RatingEntity updateRating(Long ratingId, RatingEntity updatedRating) {
        RatingEntity existingRating = ratingRepository.findById(ratingId)
                .orElseThrow(() -> new RuntimeException("Rating not found with id: " + ratingId));
        
        existingRating.setToSellerRating(updatedRating.getToSellerRating());
        existingRating.setToBuyerRating(updatedRating.getToBuyerRating());
        
        return ratingRepository.save(existingRating);
    }

    // 根据ID获取评分
    public RatingEntity getRatingById(Long ratingId) {
        return ratingRepository.findById(ratingId)
                .orElseThrow(() -> new RuntimeException("Rating not found with id: " + ratingId));
    }

    // 获取所有评分
    public List<RatingEntity> getAllRatings() {
        return ratingRepository.findAll();
    }

    // 获取卖家的所有评分
    public List<RatingEntity> getRatingsBySellerId(Long sellerId) {
        return ratingRepository.findAllBySeller_Id(sellerId);
    }

    // 获取买家的所有评分   
    public List<RatingEntity> getRatingsByBuyerId(Long buyerId) {
        return ratingRepository.findAllByBuyer_Id(buyerId);
    }

}
