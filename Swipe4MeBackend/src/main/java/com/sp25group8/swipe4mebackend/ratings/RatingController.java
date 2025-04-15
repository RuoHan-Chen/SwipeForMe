// Author: Xinying Luo
// Time spent: 1 hour

package com.sp25group8.swipe4mebackend.ratings;

import com.sp25group8.swipe4mebackend.models.ratings.RatingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<RatingDto> updateRating(
            @PathVariable Long ratingId,
            @Valid @RequestBody UpdateRatingRequest request) {
        
        RatingEntity.RatingEntityBuilder builder = RatingEntity.builder();
        
        if (request.toSellerRating() > 0) {
            builder.toSellerRating(request.toSellerRating());
        }
        if (request.toBuyerRating() > 0) {
            builder.toBuyerRating(request.toBuyerRating());
        }
            
        RatingDto result = ratingService.updateRating(ratingId, builder.build());
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<RatingEntity> createRating(@RequestParam Long transactionId) {
        RatingEntity rating = ratingService.createRating(transactionId);
        return ResponseEntity.ok(rating);
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