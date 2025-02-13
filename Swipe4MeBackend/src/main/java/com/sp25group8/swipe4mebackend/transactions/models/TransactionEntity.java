package com.sp25group8.swipe4mebackend.transactions.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Entity //Hibernate see this and map
@Builder
@Getter
@Setter
@NoArgsConstructor // Generates a no-args constructor by lombok
@AllArgsConstructor // Generates a constructor with all fields by lombok
public class TransactionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    private int mealSwipes;
    private double price;

    @Enumerated(EnumType.STRING)
    private TransactionStatus status;

    public void setCreatedAt(LocalDateTime now) {

    }

    public void setUpdatedAt(LocalDateTime now) {
    }
}
