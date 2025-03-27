package com.sp25group8.swipe4mebackend.users;

import com.sp25group8.swipe4mebackend.config.BaseRepositoryTest;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

public class UserRepositoryTest extends BaseRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testFindByEmail_ShouldReturnUser_WhenUserExists() {
        // Given
        String email = "test@example.com";
        UserEntity user = UserEntity.builder()
                .firstName("John")
                .lastName("Doe")
                .email(email)
                .phoneNumber("123-456-7890")
                .rating(4.5)
                .profilePicUrl("https://example.com/profile.jpg")
                .build();

        entityManager.persist(user);
        entityManager.flush();

        // When
        Optional<UserEntity> foundUser = userRepository.findByEmail(email);

        // Then
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getFirstName()).isEqualTo("John");
        assertThat(foundUser.get().getLastName()).isEqualTo("Doe");
        assertThat(foundUser.get().getEmail()).isEqualTo(email);
    }

    @Test
    public void testFindByEmail_ShouldReturnEmpty_WhenUserDoesNotExist() {
        // Given
        String nonExistentEmail = "nonexistent@example.com";

        // When
        Optional<UserEntity> foundUser = userRepository.findByEmail(nonExistentEmail);

        // Then
        assertThat(foundUser).isEmpty();
    }

    @Test
    public void testExistsByEmail_ShouldReturnTrue_WhenUserExists() {
        // Given
        String email = "exists@example.com";
        UserEntity user = UserEntity.builder()
                .firstName("Jane")
                .lastName("Smith")
                .email(email)
                .build();

        entityManager.persist(user);
        entityManager.flush();

        // When
        boolean exists = userRepository.existsByEmail(email);

        // Then
        assertThat(exists).isTrue();
    }

    @Test
    public void testExistsByEmail_ShouldReturnFalse_WhenUserDoesNotExist() {
        // Given
        String nonExistentEmail = "doesnotexist@example.com";

        // When
        boolean exists = userRepository.existsByEmail(nonExistentEmail);

        // Then
        assertThat(exists).isFalse();
    }
}