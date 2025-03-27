package com.sp25group8.swipe4mebackend.authentication;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.sp25group8.swipe4mebackend.users.UserRepository;
import com.sp25group8.swipe4mebackend.users.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceTest {

    @Mock
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthenticationManager authenticationManager;

    private AuthenticationService authenticationService;

    // For testing private methods
    private Payload mockPayload;

    @BeforeEach
    void setUp() {
        // Create service with mocks
        authenticationService = new AuthenticationService(userService, userRepository, authenticationManager);

        // Set the test OAuth client ID
        ReflectionTestUtils.setField(authenticationService, "oauthClientId", "test-client-id");

        // Create mock payload for testing helper methods
        mockPayload = Mockito.mock(Payload.class);
    }

    @Test
    void testGetFieldFromPayload_WithValue() throws Exception {
        // Arrange
        when(mockPayload.get("testField")).thenReturn("testValue");

        // Act
        String result = ReflectionTestUtils.invokeMethod(authenticationService, "getFieldFromPayload", mockPayload,
                "testField");

        // Assert
        assertThat(result).isEqualTo("testValue");
    }

    @Test
    void testGetFieldFromPayload_WithNullValue() throws Exception {
        // Arrange
        when(mockPayload.get("nullField")).thenReturn(null);

        // Act
        String result = ReflectionTestUtils.invokeMethod(authenticationService, "getFieldFromPayload", mockPayload,
                "nullField");

        // Assert
        assertThat(result).isEqualTo("");
    }

    @Test
    void testCreateUserFromPayload() throws Exception {
        // Arrange
        when(mockPayload.get("given_name")).thenReturn("John");
        when(mockPayload.get("family_name")).thenReturn("Doe");
        when(mockPayload.get("email")).thenReturn("john.doe@example.com");
        when(mockPayload.get("picture")).thenReturn("https://example.com/profile.jpg");

        // Act
        ReflectionTestUtils.invokeMethod(authenticationService, "createUserFromPayload", mockPayload);

        // Assert
        verify(userService).createUser("John", "Doe", "john.doe@example.com", null, "https://example.com/profile.jpg");
    }
}