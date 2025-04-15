// Author: Xinying Luo
// Time spent: 15 minutes

package com.sp25group8.swipe4mebackend.models.ratings;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.sp25group8.swipe4mebackend.models.transactions.TransactionEntity;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

        @OneToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "transaction_id", nullable = false)
        @OnDelete(action = OnDeleteAction.CASCADE)
        private TransactionEntity transaction;

        @Column(name = "to_seller_rating")
        private Double toSellerRating;

        @Column(name = "to_buyer_rating")
        private Double toBuyerRating;
}
