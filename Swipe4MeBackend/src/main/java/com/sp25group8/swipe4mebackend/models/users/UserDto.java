// Author: Steven Yi
// Time spent: 1 minute

package com.sp25group8.swipe4mebackend.models.users;

public record UserDto(
        Long id,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        Double rating,
        String profilePicUrl) {

    public static UserDto fromEntity(UserEntity userEntity) {
        return new UserDto(
                userEntity.getId(),
                userEntity.getFirstName(),
                userEntity.getLastName(),
                userEntity.getEmail(),
                userEntity.getPhoneNumber(),
                userEntity.getRating(),
                userEntity.getProfilePicUrl());
    }

}
