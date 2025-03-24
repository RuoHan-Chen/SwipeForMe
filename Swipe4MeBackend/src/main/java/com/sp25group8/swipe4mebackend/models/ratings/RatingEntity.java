// Author: Xinying Luo
// Time spent: 15 minutes

package com.sp25group8.swipe4mebackend.models.ratings;

import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "ratings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RatingEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "r_id")
        private Long rId;

        @ManyToOne
        @JoinColumn(name = "seller_id", nullable = false)
        private UserEntity seller;

        @ManyToOne
        @JoinColumn(name = "buyer_id", nullable = false)
        private UserEntity buyer;

        @Column(name = "to_seller_rating")
        private Double toSellerRating;

        @Column(name = "to_buyer_rating")
        private Double toBuyerRating;
}
