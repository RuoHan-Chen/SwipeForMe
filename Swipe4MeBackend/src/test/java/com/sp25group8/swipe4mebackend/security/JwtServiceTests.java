package com.sp25group8.swipe4mebackend.security;

import com.sp25group8.swipe4mebackend.models.users.UserEntity;

import io.jsonwebtoken.ExpiredJwtException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class JwtServiceTests {

    private JwtService jwtService;
    private UserEntity user;

    private static final String SECRET_KEY = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "secretKey", SECRET_KEY);
        ReflectionTestUtils.setField(jwtService, "expirationTime", EXPIRATION_TIME);

        // Mock UserDetails
        user = new UserEntity(
                1L,
                "John",
                "Doe",
                "jd@gmail.com",
                "123",
                null,
                "abc.com");
    }

    @Test
    void generateToken_WithoutExtraClaims_ShouldGenerateValidToken() {
        // Act
        String token = jwtService.generateToken(user);

        // Assert
        assertThat(token).isNotNull();
        assertThat(token).isNotEmpty();
        assertThat(jwtService.isTokenValid(token, user)).isTrue();
        assertThat(jwtService.extractUsername(token)).isEqualTo("jd@gmail.com");
    }

    @Test
    void isTokenValid_WithValidToken_ShouldReturnTrue() {
        // Arrange
        String token = jwtService.generateToken(user);

        // Act & Assert
        assertThat(jwtService.isTokenValid(token, user)).isTrue();
    }

    @Test
    void isTokenValid_WithInvalidUsername_ShouldReturnFalse() {
        // Arrange
        String token = jwtService.generateToken(user);
        UserEntity differentUser = new UserEntity(
                2L,
                "Jane",
                "Doe",
                "different@example.com",
                "password123",
                null,
                null);

        // Act & Assert
        assertThat(jwtService.isTokenValid(token, differentUser)).isFalse();
    }

    @Test
    void extractUsername_ShouldReturnCorrectUsername() {
        // Arrange
        String token = jwtService.generateToken(user);

        // Act
        String extractedUsername = jwtService.extractUsername(token);

        // Assert
        assertThat(extractedUsername).isEqualTo(user.getUsername());
    }

    @Test
    void isTokenValid_WithExpiredToken_ShouldReturnFalse() {
        // Arrange
        // Set a very short expiration time for this test
        ReflectionTestUtils.setField(jwtService, "expirationTime", 1); // 1ms
        String token = jwtService.generateToken(user);

        // Wait for token to expire
        try {
            Thread.sleep(2); // Wait 2ms
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // Act & Assert
        assertThatThrownBy(() -> jwtService.isTokenValid(token, user))
                .isInstanceOf(ExpiredJwtException.class);
    }

}
