package com.sp25group8.swipe4mebackend.authentication;

import com.sp25group8.swipe4mebackend.users.models.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/oauth2/google/login")
    public UserEntity googleLogin(
            @RequestParam("id_token") String idToken
    ) throws GeneralSecurityException, IOException {
        return authenticationService.processGoogleIdTokenString(idToken);
    }

}
