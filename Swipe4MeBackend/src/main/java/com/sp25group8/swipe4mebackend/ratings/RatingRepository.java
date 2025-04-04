// Author: Xinying Luo
// Time spent: 1 hour

package com.sp25group8.swipe4mebackend.ratings;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sp25group8.swipe4mebackend.models.ratings.RatingEntity;

@Repository
public interface RatingRepository extends JpaRepository<RatingEntity, Long> {
    List<RatingEntity> findAllBySeller_Id(Long sellerId);

    List<RatingEntity> findAllByBuyer_Id(Long buyerId);
}
