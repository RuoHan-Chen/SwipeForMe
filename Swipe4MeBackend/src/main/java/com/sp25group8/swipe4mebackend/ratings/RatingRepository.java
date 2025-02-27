// Author: Xinying Luo
// Time spent: 1 hour

package com.sp25group8.swipe4mebackend.ratings;

import com.sp25group8.swipe4mebackend.models.ratings.RatingEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends CrudRepository<RatingEntity, Long> {
    List<RatingEntity> findAllBySellerId(Long sellerId);

    List<RatingEntity> findAllByBuyerId(Long buyerId);
}
