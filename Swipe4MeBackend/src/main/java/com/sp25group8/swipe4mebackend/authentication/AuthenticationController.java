package com.sp25group8.swipe4mebackend.authentication;

import com.sp25group8.swipe4mebackend.models.authentication.LoginResponse;
import com.sp25group8.swipe4mebackend.exceptions.InvalidGoogleIdTokenException;
import com.sp25group8.swipe4mebackend.security.JwtService;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    @PostMapping("/oauth2/google/login")
    public LoginResponse googleLogin(
            @RequestParam("id_token") String idToken
    ) throws GeneralSecurityException, IOException, InvalidGoogleIdTokenException {
        UserEntity authenticatedUser = authenticationService.processGoogleIdTokenString(idToken);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String token = jwtService.generateToken(authenticatedUser);

        return new LoginResponse(token);
    }

}
