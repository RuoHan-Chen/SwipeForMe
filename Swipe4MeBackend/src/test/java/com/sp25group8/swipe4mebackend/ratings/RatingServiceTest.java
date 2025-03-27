package com.sp25group8.swipe4mebackend.ratings;

import com.sp25group8.swipe4mebackend.models.ratings.RatingEntity;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RatingServiceTest {

    @Mock
    private RatingRepository ratingRepository;

    private RatingService ratingService;

    @BeforeEach
    void setUp() {
        ratingService = new RatingService(ratingRepository);
    }

    @Test
    void getUserRating_WhenUserHasRatingsAsBothSellerAndBuyer_ShouldCalculateAverageRating() {
        // Given
        Long userId = 1L;
        UserEntity user = createTestUser(userId, "John", "Doe", "john@example.com");
        UserEntity otherUser1 = createTestUser(2L, "Jane", "Smith", "jane@example.com");
        UserEntity otherUser2 = createTestUser(3L, "Bob", "Johnson", "bob@example.com");

        RatingEntity sellerRating1 = createTestRating(1L, user, otherUser1, 4.5, 5.0);
        RatingEntity sellerRating2 = createTestRating(2L, user, otherUser2, 3.5, 4.0);

        RatingEntity buyerRating1 = createTestRating(3L, otherUser1, user, 5.0, 4.0);
        RatingEntity buyerRating2 = createTestRating(4L, otherUser2, user, 3.0, 3.5);

        when(ratingRepository.findAllBySellerId(userId)).thenReturn(Arrays.asList(sellerRating1, sellerRating2));
        when(ratingRepository.findAllByBuyerId(userId)).thenReturn(Arrays.asList(buyerRating1, buyerRating2));

        // When
        double result = ratingService.getUserRating(userId);

        // Then
        // Expected average: (4.5 + 3.5 + 4.0 + 3.5) / 4 = 15.5 / 4 = 3.875
        assertThat(result).isEqualTo(3.875);
    }

    @Test
    void getUserRating_WhenUserHasOnlySellerRatings_ShouldCalculateAverageRating() {
        // Given
        Long userId = 1L;
        UserEntity user = createTestUser(userId, "John", "Doe", "john@example.com");
        UserEntity otherUser1 = createTestUser(2L, "Jane", "Smith", "jane@example.com");
        UserEntity otherUser2 = createTestUser(3L, "Bob", "Johnson", "bob@example.com");

        RatingEntity sellerRating1 = createTestRating(1L, user, otherUser1, 4.5, 5.0);
        RatingEntity sellerRating2 = createTestRating(2L, user, otherUser2, 3.5, 4.0);

        when(ratingRepository.findAllBySellerId(userId)).thenReturn(Arrays.asList(sellerRating1, sellerRating2));
        when(ratingRepository.findAllByBuyerId(userId)).thenReturn(Collections.emptyList());

        // When
        double result = ratingService.getUserRating(userId);

        // Then
        // Expected average: (4.5 + 3.5) / 2 = 8.0 / 2 = 4.0
        assertThat(result).isEqualTo(4.0);
    }

    @Test
    void getUserRating_WhenUserHasOnlyBuyerRatings_ShouldCalculateAverageRating() {
        // Given
        Long userId = 1L;
        UserEntity user = createTestUser(userId, "John", "Doe", "john@example.com");
        UserEntity otherUser1 = createTestUser(2L, "Jane", "Smith", "jane@example.com");
        UserEntity otherUser2 = createTestUser(3L, "Bob", "Johnson", "bob@example.com");

        RatingEntity buyerRating1 = createTestRating(3L, otherUser1, user, 5.0, 4.0);
        RatingEntity buyerRating2 = createTestRating(4L, otherUser2, user, 3.0, 3.5);

        when(ratingRepository.findAllBySellerId(userId)).thenReturn(Collections.emptyList());
        when(ratingRepository.findAllByBuyerId(userId)).thenReturn(Arrays.asList(buyerRating1, buyerRating2));

        // When
        double result = ratingService.getUserRating(userId);

        // Then
        // Expected average: (4.0 + 3.5) / 2 = 7.5 / 2 = 3.75
        assertThat(result).isEqualTo(3.75);
    }

    @Test
    void getUserRating_WhenUserHasNoRatings_ShouldReturnNegativeOne() {
        // Given
        Long userId = 1L;

        when(ratingRepository.findAllBySellerId(userId)).thenReturn(Collections.emptyList());
        when(ratingRepository.findAllByBuyerId(userId)).thenReturn(Collections.emptyList());

        // When
        double result = ratingService.getUserRating(userId);

        // Then
        assertThat(result).isEqualTo(-1);
    }

    // Helper methods to create test objects

    private UserEntity createTestUser(Long id, String firstName, String lastName, String email) {
        UserEntity user = UserEntity.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .build();
        user.setId(id);
        return user;
    }

    private RatingEntity createTestRating(Long id, UserEntity seller, UserEntity buyer,
            Double toSellerRating, Double toBuyerRating) {
        RatingEntity rating = RatingEntity.builder()
                .seller(seller)
                .buyer(buyer)
                .toSellerRating(toSellerRating)
                .toBuyerRating(toBuyerRating)
                .build();
        return rating;
    }
}