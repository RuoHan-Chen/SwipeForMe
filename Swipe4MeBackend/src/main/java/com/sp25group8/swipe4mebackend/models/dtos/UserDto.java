package com.sp25group8.swipe4mebackend.models.dtos;

import com.sp25group8.swipe4mebackend.models.users.UserEntity;

public record UserDto(
        Long id,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        Double rating,
        String profilePicUrl
) {

    public static UserDto fromEntity(UserEntity userEntity) {
        return new UserDto(
                userEntity.id(),
                userEntity.firstName(),
                userEntity.lastName(),
                userEntity.email(),
                userEntity.phoneNumber(),
                userEntity.rating(),
                userEntity.ProfilePicUrl()
        );
    }

    public UserEntity toEntity() {
        return new UserEntity(
                id,
                firstName,
                lastName,
                email,
                phoneNumber,
                rating,
                profilePicUrl
        );
    }

}
