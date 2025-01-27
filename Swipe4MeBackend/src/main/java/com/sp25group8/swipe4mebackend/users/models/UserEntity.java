package com.sp25group8.swipe4mebackend.users.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("users")
public record UserEntity(
        @Id
        Long id,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        Boolean isBuyer,
        Double rating
) {
}
