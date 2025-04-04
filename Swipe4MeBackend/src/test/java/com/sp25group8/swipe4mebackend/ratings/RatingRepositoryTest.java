package com.sp25group8.swipe4mebackend.ratings;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.sp25group8.swipe4mebackend.config.BaseRepositoryTest;
import com.sp25group8.swipe4mebackend.models.ratings.RatingEntity;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;

public class RatingRepositoryTest extends BaseRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private RatingRepository ratingRepository;

    @Test
    public void testFindAllBySellerId_ShouldReturnSellerRatings() {
        // Create test users
        UserEntity seller = UserEntity.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john@example.com")
                .build();

        UserEntity buyer1 = UserEntity.builder()
                .firstName("Jane")
                .lastName("Smith")
                .email("jane@example.com")
                .build();

        UserEntity buyer2 = UserEntity.builder()
                .firstName("Bob")
                .lastName("Johnson")
                .email("bob@example.com")
                .build();

        entityManager.persist(seller);
        entityManager.persist(buyer1);
        entityManager.persist(buyer2);

        // Create ratings
        RatingEntity rating1 = RatingEntity.builder()
                .seller(seller)
                .buyer(buyer1)
                .toSellerRating(4.5)
                .toBuyerRating(5.0)
                .build();

        RatingEntity rating2 = RatingEntity.builder()
                .seller(seller)
                .buyer(buyer2)
                .toSellerRating(3.5)
                .toBuyerRating(4.0)
                .build();

        // Another rating with seller as buyer
        RatingEntity rating3 = RatingEntity.builder()
                .seller(buyer1)
                .buyer(seller)
                .toSellerRating(4.0)
                .toBuyerRating(3.5)
                .build();

        entityManager.persist(rating1);
        entityManager.persist(rating2);
        entityManager.persist(rating3);
        entityManager.flush();

        // Test repository method
        List<RatingEntity> sellerRatings = ratingRepository.findAllBySeller_Id(seller.getId());

        // Assertions
        assertThat(sellerRatings).hasSize(2);
        assertThat(sellerRatings).extracting("toSellerRating")
                .containsExactlyInAnyOrder(4.5, 3.5);
    }

    @Test
    public void testFindAllByBuyerId_ShouldReturnBuyerRatings() {
        // Create test users
        UserEntity seller1 = UserEntity.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john@example.com")
                .build();

        UserEntity seller2 = UserEntity.builder()
                .firstName("Jane")
                .lastName("Smith")
                .email("jane@example.com")
                .build();

        UserEntity buyer = UserEntity.builder()
                .firstName("Bob")
                .lastName("Johnson")
                .email("bob@example.com")
                .build();

        entityManager.persist(seller1);
        entityManager.persist(seller2);
        entityManager.persist(buyer);

        // Create ratings
        RatingEntity rating1 = RatingEntity.builder()
                .seller(seller1)
                .buyer(buyer)
                .toSellerRating(4.5)
                .toBuyerRating(5.0)
                .build();

        RatingEntity rating2 = RatingEntity.builder()
                .seller(seller2)
                .buyer(buyer)
                .toSellerRating(3.5)
                .toBuyerRating(4.0)
                .build();

        // Another rating with buyer as seller
        RatingEntity rating3 = RatingEntity.builder()
                .seller(buyer)
                .buyer(seller1)
                .toSellerRating(4.0)
                .toBuyerRating(3.5)
                .build();

        entityManager.persist(rating1);
        entityManager.persist(rating2);
        entityManager.persist(rating3);
        entityManager.flush();

        // Test repository method
        List<RatingEntity> buyerRatings = ratingRepository.findAllByBuyer_Id(buyer.getId());

        // Assertions
        assertThat(buyerRatings).hasSize(2);
        assertThat(buyerRatings).extracting("toBuyerRating")
                .containsExactlyInAnyOrder(5.0, 4.0);
    }

    @Test
    public void testFindAllBySellerId_WhenNoRatings_ShouldReturnEmptyList() {
        // Create test user without ratings
        UserEntity user = UserEntity.builder()
                .firstName("Alice")
                .lastName("Johnson")
                .email("alice@example.com")
                .build();

        entityManager.persist(user);
        entityManager.flush();

        // Test repository method
        List<RatingEntity> sellerRatings = ratingRepository.findAllBySeller_Id(user.getId());

        // Assertions
        assertThat(sellerRatings).isEmpty();
    }

    @Test
    public void testFindAllByBuyerId_WhenNoRatings_ShouldReturnEmptyList() {
        // Create test user without ratings
        UserEntity user = UserEntity.builder()
                .firstName("Alice")
                .lastName("Johnson")
                .email("alice@example.com")
                .build();

        entityManager.persist(user);
        entityManager.flush();

        // Test repository method
        List<RatingEntity> buyerRatings = ratingRepository.findAllByBuyer_Id(user.getId());

        // Assertions
        assertThat(buyerRatings).isEmpty();
    }
}