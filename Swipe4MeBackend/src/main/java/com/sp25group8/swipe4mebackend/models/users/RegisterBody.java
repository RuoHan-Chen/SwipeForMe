package com.sp25group8.swipe4mebackend.models.users;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;

public record RegisterBody(
        @JsonProperty("first_name")
        String firstName,

        @JsonProperty("last_name")
        String lastName,

        @Email
        String email,

        @JsonProperty("phone_number")
        String phoneNumber,

        @JsonProperty("is_buyer")
        String isBuyer
) {
}
