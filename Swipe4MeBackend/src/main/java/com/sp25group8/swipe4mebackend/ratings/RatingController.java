// Author: Xinying Luo
// Time spent: 1 hour

package com.sp25group8.swipe4mebackend.ratings;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import com.sp25group8.swipe4mebackend.models.ratings.RatingEntity;

@RestController
@RequestMapping("/ratings") //request will respond according to the kw
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;

    @GetMapping
    public ResponseEntity<Double> getUserRating(@RequestParam Long userId) {
        Double r =  ratingService.getUserRating(userId);
        return ResponseEntity.ok(r);
    }

    @PutMapping("/{ratingId}")
    public ResponseEntity<RatingEntity> updateRating(
            @PathVariable Long ratingId,
            @Valid @RequestBody UpdateRatingRequest request) {
        
        RatingEntity updatedRating = RatingEntity.builder()
            .toSellerRating(request.toSellerRating())
            .toBuyerRating(request.toBuyerRating())
            .build();
            
        RatingEntity result = ratingService.updateRating(ratingId, updatedRating);
        return ResponseEntity.ok(result);
    }

}

record UpdateRatingRequest(
    @Min(0)
    @Max(5)
    Double toSellerRating,

    @Min(0)
    @Max(5)
    Double toBuyerRating
) {}