package com.sp25group8.swipe4mebackend.availability;

import com.sp25group8.swipe4mebackend.emails.EmailService;
import com.sp25group8.swipe4mebackend.exceptions.AvailabilityNotFoundException;
import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityDto;
import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;
import com.sp25group8.swipe4mebackend.models.enums.DiningLocation;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionEntity;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import com.sp25group8.swipe4mebackend.users.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AvailabilityServiceTest {

    @Mock
    private AvailabilityRepository availabilityRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private AvailabilityService availabilityService;

    @Test
    public void testGetAvailabilities_ShouldReturnAllAvailabilities() {
        // Setup mock data
        UserEntity user = createTestUser(1L, "John", "Doe", "john@example.com");

        AvailabilityEntity availability1 = createTestAvailability(1L, user, DiningLocation.COMMONS);
        AvailabilityEntity availability2 = createTestAvailability(2L, user, DiningLocation.RAND);

        when(availabilityRepository.findAll()).thenReturn(Arrays.asList(availability1, availability2));

        // Call service method
        List<AvailabilityDto> result = availabilityService.getAvailabilities();

        // Verify results
        assertThat(result).hasSize(2);
        assertThat(result.get(0).id()).isEqualTo(1L);
        assertThat(result.get(0).location()).isEqualTo(DiningLocation.COMMONS);
        assertThat(result.get(1).id()).isEqualTo(2L);
        assertThat(result.get(1).location()).isEqualTo(DiningLocation.RAND);

        verify(availabilityRepository).findAll();
    }

    @Test
    public void testGetAvailabilitiesByUserId_ShouldReturnUserAvailabilities() {
        // Setup mock data
        UserEntity user = createTestUser(1L, "John", "Doe", "john@example.com");

        AvailabilityEntity availability1 = createTestAvailability(1L, user, DiningLocation.COMMONS);
        AvailabilityEntity availability2 = createTestAvailability(2L, user, DiningLocation.RAND);

        when(availabilityRepository.findAllByUserId(1L)).thenReturn(Arrays.asList(availability1, availability2));

        // Call service method
        List<AvailabilityDto> result = availabilityService.getAvailabilitiesByUserId(1L);

        // Verify results
        assertThat(result).hasSize(2);
        assertThat(result.get(0).id()).isEqualTo(1L);
        assertThat(result.get(0).user().id()).isEqualTo(1L);
        assertThat(result.get(0).location()).isEqualTo(DiningLocation.COMMONS);

        verify(availabilityRepository).findAllByUserId(1L);
    }

    @Test
    public void testCreateAvailability_ShouldCreateAndReturnNewAvailability() {
        // Setup mock data
        Long userId = 1L;
        DiningLocation location = DiningLocation.COMMONS;
        LocalDateTime startTime = LocalDateTime.now();
        LocalDateTime endTime = startTime.plusHours(2);

        UserEntity user = createTestUser(userId, "John", "Doe", "john@example.com");

        AvailabilityEntity savedAvailability = AvailabilityEntity.builder()
                .id(1L)
                .user(user)
                .location(location)
                .startTime(startTime)
                .endTime(endTime)
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(availabilityRepository.save(any(AvailabilityEntity.class))).thenReturn(savedAvailability);

        // Call service method
        AvailabilityDto result = availabilityService.createAvailability(userId, location, startTime, endTime);

        // Verify results
        assertThat(result).isNotNull();
        assertThat(result.id()).isEqualTo(1L);
        assertThat(result.user().id()).isEqualTo(userId);
        assertThat(result.location()).isEqualTo(location);
        assertThat(result.startTime()).isEqualTo(startTime);
        assertThat(result.endTime()).isEqualTo(endTime);

        verify(userRepository).findById(userId);
        verify(availabilityRepository).save(any(AvailabilityEntity.class));
    }

    @Test
    public void testRemoveAvailability_ShouldRemoveAvailabilityAndNotifyBuyers() {
        // Setup mock data
        Long availabilityId = 1L;

        UserEntity seller = createTestUser(1L, "John", "Doe", "john@example.com");
        UserEntity buyer1 = createTestUser(2L, "Alice", "Smith", "alice@example.com");
        UserEntity buyer2 = createTestUser(3L, "Bob", "Johnson", "bob@example.com");

        AvailabilityEntity availability = createTestAvailability(availabilityId, seller, DiningLocation.COMMONS);

        // Add transactions with buyers
        TransactionEntity transaction1 = new TransactionEntity();
        transaction1.setBuyer(buyer1);

        TransactionEntity transaction2 = new TransactionEntity();
        transaction2.setBuyer(buyer2);

        List<TransactionEntity> transactions = new ArrayList<>();
        transactions.add(transaction1);
        transactions.add(transaction2);

        availability.setTransactions(transactions);

        when(availabilityRepository.findById(availabilityId)).thenReturn(Optional.of(availability));

        // Call service method
        availabilityService.removeAvailability(availabilityId);

        // Verify that the repository methods were called
        verify(availabilityRepository).findById(availabilityId);
        verify(availabilityRepository).deleteById(availabilityId);

        // Verify that emails were sent to both buyers
        verify(emailService).sendAvailabilityDeletedEmail(eq(availability), eq("alice@example.com"));
        verify(emailService).sendAvailabilityDeletedEmail(eq(availability), eq("bob@example.com"));
    }

    @Test
    public void testRemoveAvailability_WhenAvailabilityNotFound_ShouldThrowException() {
        // Setup
        Long availabilityId = 999L;
        when(availabilityRepository.findById(availabilityId)).thenReturn(Optional.empty());

        // Test and verify
        assertThrows(AvailabilityNotFoundException.class, () -> availabilityService.removeAvailability(availabilityId));

        verify(availabilityRepository).findById(availabilityId);
        verifyNoMoreInteractions(availabilityRepository);
        verifyNoInteractions(emailService);
    }

    // Helper methods to create test objects

    private UserEntity createTestUser(Long id, String firstName, String lastName, String email) {
        UserEntity user = UserEntity.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .build();
        user.setId(id);
        return user;
    }

    private AvailabilityEntity createTestAvailability(Long id, UserEntity user, DiningLocation location) {
        LocalDateTime now = LocalDateTime.now();
        AvailabilityEntity availability = AvailabilityEntity.builder()
                .user(user)
                .location(location)
                .startTime(now)
                .endTime(now.plusHours(2))
                .transactions(new ArrayList<>())
                .build();
        availability.setId(id);
        return availability;
    }
}