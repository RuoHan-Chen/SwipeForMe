package com.sp25group8.swipe4mebackend.models.ratings;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("ratings")
public record RatingEntity(
        @Id
        Long id,
        Long from,
        Long to,
        Double rating
) {
}
