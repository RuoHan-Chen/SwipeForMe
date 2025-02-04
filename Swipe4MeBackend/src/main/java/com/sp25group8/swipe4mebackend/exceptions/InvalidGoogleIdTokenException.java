package com.sp25group8.swipe4mebackend.exceptions;

public class InvalidGoogleIdTokenException extends Exception {
    public InvalidGoogleIdTokenException() {
        super("Invalid Google ID Token");
    }
}
