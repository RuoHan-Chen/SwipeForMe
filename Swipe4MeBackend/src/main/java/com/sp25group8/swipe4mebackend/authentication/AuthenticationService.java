package com.sp25group8.swipe4mebackend.authentication;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.sp25group8.swipe4mebackend.users.UserService;
import com.sp25group8.swipe4mebackend.users.models.UserEntity;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class AuthenticationService {

    private final UserService userService;


    public AuthenticationService(UserService userService) {
        this.userService = userService;
    }

    private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);

    @Value("${OAUTH_CLIENT_ID}")
    private String oauthClientId;

    public UserEntity processGoogleIdTokenString(String idTokenString) throws GeneralSecurityException, IOException {
        GoogleIdToken idToken = verifyIdToken(idTokenString);
        if (idToken != null) {
            Payload payload = idToken.getPayload();
            return createUserFromPayload(payload);
        } else {
            log.warn("Invalid ID token");
            return null;
        }
    }

    private GoogleIdToken verifyIdToken(String idTokenString) throws GeneralSecurityException, IOException {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(oauthClientId))
                .build();
        return verifier.verify(idTokenString);
    }

    private UserEntity createUserFromPayload(Payload payload) {
        String firstName = payload.get("given_name").toString();
        String lastName = payload.get("family_name").toString();
        String email = payload.get("email").toString();

        // Require users to provide their phone number later
        return userService.createUser(firstName, lastName, email, null);
    }

}
