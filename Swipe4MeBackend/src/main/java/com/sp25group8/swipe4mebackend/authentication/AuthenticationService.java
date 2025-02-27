// Author: Steven Yi
// Time spent: 3 hours

package com.sp25group8.swipe4mebackend.authentication;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.sp25group8.swipe4mebackend.exceptions.InvalidGoogleIdTokenException;
import com.sp25group8.swipe4mebackend.users.UserRepository;
import com.sp25group8.swipe4mebackend.users.UserService;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class AuthenticationService {

    private final UserService userService;
    private final UserRepository userRepository;


    public AuthenticationService(UserService userService, UserRepository userRepository, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);

    @Value("${OAUTH_CLIENT_ID}")
    private String oauthClientId;

    public UserEntity processGoogleIdTokenString(String idTokenString) throws GeneralSecurityException, IOException, InvalidGoogleIdTokenException {
        // Verify that the id token is from Google
        GoogleIdToken idToken = verifyIdToken(idTokenString);

        if (idToken != null) {
            Payload payload = idToken.getPayload();

            String email = getFieldFromPayload(payload, "email");

            // Create user if first time signing in
            if (!userRepository.existsByEmail(email)) {
                createUserFromPayload(payload);
            }

            UserEntity user = userRepository.findByEmail(email).orElseThrow();
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities()));

            return user;
        } else {
            throw new InvalidGoogleIdTokenException();
        }
    }

    private GoogleIdToken verifyIdToken(String idTokenString) throws GeneralSecurityException, IOException {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(oauthClientId))
                .build();
        return verifier.verify(idTokenString);
    }


    private void createUserFromPayload(Payload payload) {
        String firstName = getFieldFromPayload(payload, "given_name");
        String lastName = getFieldFromPayload(payload, "family_name");
        String email = getFieldFromPayload(payload, "email");
        String profilePictureUrl = getFieldFromPayload(payload, "picture");

        // Require users to provide their phone number later
        userService.createUser(firstName, lastName, email, null, profilePictureUrl);
    }

    private String getFieldFromPayload(Payload payload, String fieldName) {
        Object value = payload.get(fieldName);
        return value == null ? "" : value.toString();
    }

}
