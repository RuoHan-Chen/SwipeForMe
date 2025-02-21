package com.sp25group8.swipe4mebackend.ratings;

import com.sp25group8.swipe4mebackend.models.ratings.RatingEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends CrudRepository<RatingEntity, Long> {
}
