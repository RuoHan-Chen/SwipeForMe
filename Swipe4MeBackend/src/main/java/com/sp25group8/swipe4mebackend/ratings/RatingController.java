package com.sp25group8.swipe4mebackend.ratings;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

}
