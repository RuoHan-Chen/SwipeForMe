package com.sp25group8.swipe4mebackend.transactions.models;

import jakarta.persistence.*;

@Entity
@Table(name = "users") // Ensure correct table mapping
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
