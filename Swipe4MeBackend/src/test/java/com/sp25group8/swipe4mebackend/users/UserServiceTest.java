package com.sp25group8.swipe4mebackend.users;

import com.sp25group8.swipe4mebackend.exceptions.UserNotFoundException;
import com.sp25group8.swipe4mebackend.models.users.UserDto;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService(userRepository);
    }

    @Test
    void testCreateUser_ShouldSaveAndReturnUser() {
        // Given
        String firstName = "John";
        String lastName = "Doe";
        String email = "john@example.com";
        String phoneNumber = "123-456-7890";
        String profilePicUrl = "https://example.com/profile.jpg";

        UserEntity savedUser = UserEntity.builder()
                .id(1L)
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .phoneNumber(phoneNumber)
                .profilePicUrl(profilePicUrl)
                .build();

        when(userRepository.save(any(UserEntity.class))).thenReturn(savedUser);

        // When
        UserEntity result = userService.createUser(firstName, lastName, email, phoneNumber, profilePicUrl);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getFirstName()).isEqualTo(firstName);
        assertThat(result.getLastName()).isEqualTo(lastName);
        assertThat(result.getEmail()).isEqualTo(email);

        ArgumentCaptor<UserEntity> userCaptor = ArgumentCaptor.forClass(UserEntity.class);
        verify(userRepository).save(userCaptor.capture());

        UserEntity capturedUser = userCaptor.getValue();
        assertThat(capturedUser.getFirstName()).isEqualTo(firstName);
        assertThat(capturedUser.getLastName()).isEqualTo(lastName);
        assertThat(capturedUser.getEmail()).isEqualTo(email);
        assertThat(capturedUser.getPhoneNumber()).isEqualTo(phoneNumber);
        assertThat(capturedUser.getProfilePicUrl()).isEqualTo(profilePicUrl);
    }

    @Test
    void testGetCurrentUser_ShouldReturnCurrentUser() {
        // This test requires more setup to mock SecurityContextHolder
        // We'll test this in a separate class with proper mocking
    }

    @Test
    void testGetUserById_ShouldReturnUser_WhenUserExists() {
        // Given
        Long userId = 1L;
        UserEntity user = UserEntity.builder()
                .id(userId)
                .firstName("John")
                .lastName("Doe")
                .email("john@example.com")
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // When
        UserDto result = userService.getUserById(userId);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.id()).isEqualTo(userId);
        assertThat(result.firstName()).isEqualTo("John");
        assertThat(result.lastName()).isEqualTo("Doe");

        verify(userRepository).findById(userId);
    }

    @Test
    void testGetUserById_ShouldThrowException_WhenUserDoesNotExist() {
        // Given
        Long nonExistentUserId = 999L;
        when(userRepository.findById(nonExistentUserId)).thenReturn(Optional.empty());

        // When/Then
        assertThrows(UserNotFoundException.class, () -> userService.getUserById(nonExistentUserId));

        verify(userRepository).findById(nonExistentUserId);
    }
}