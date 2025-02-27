// Author: Steven Yi
// Time spent: 1 minute

package com.sp25group8.swipe4mebackend.models.errors;

public record ErrorResponse(
        String error,
        String message
) {
}
