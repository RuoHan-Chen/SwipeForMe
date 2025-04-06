package com.sp25group8.swipe4mebackend.emails;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;
import com.sp25group8.swipe4mebackend.models.enums.DiningLocation;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class EmailServiceTest {

    @Mock
    private JavaMailSender javaMailSender;

    @Captor
    private ArgumentCaptor<SimpleMailMessage> messageCaptor;

    private EmailService emailService;
    private final String SWIPE4ME_URL = "https://swipe-for-me.vercel.app";

    @BeforeEach
    void setUp() {
        emailService = new EmailService(javaMailSender);
    }

    @Test
    void sendInvitationNotificationEmail_ShouldSendCorrectEmail() {
        // Given
        String toEmail = "test@example.com";

        // When
        emailService.sendInvitationNotificationEmail(toEmail);

        // Then
        verify(javaMailSender).send(messageCaptor.capture());
        SimpleMailMessage capturedMessage = messageCaptor.getValue();

        assertThat(capturedMessage.getTo()).containsExactly(toEmail);
        assertThat(capturedMessage.getFrom()).isEqualTo("no-reply@swipe4me.com");
        assertThat(capturedMessage.getSubject()).isEqualTo("Swipe4Me - New Invitation");
        assertThat(capturedMessage.getText()).contains("Someone has invited you to swipe for them!");
        assertThat(capturedMessage.getText()).contains(SWIPE4ME_URL + "/dashboard");
    }

    @Test
    void sendAvailabilityDeletedEmail_ShouldSendCorrectEmail() {
        // Given
        String toEmail = "buyer@example.com";
        LocalDateTime startTime = LocalDateTime.of(2025, 3, 15, 12, 0);
        LocalDateTime endTime = LocalDateTime.of(2025, 3, 15, 14, 0);

        UserEntity seller = UserEntity.builder()
                .firstName("John")
                .lastName("Doe")
                .email("seller@example.com")
                .build();

        AvailabilityEntity availability = AvailabilityEntity.builder()
                .user(seller)
                .location(DiningLocation.COMMONS)
                .startTime(startTime)
                .endTime(endTime)
                .build();

        // When
        emailService.sendAvailabilityDeletedEmail(availability, toEmail);

        // Then
        verify(javaMailSender).send(messageCaptor.capture());
        SimpleMailMessage capturedMessage = messageCaptor.getValue();

        String expectedStartTimeFormatted = startTime.format(DateTimeFormatter.ofPattern("MMM dd, yyyy hh:mm a"));
        String expectedEndTimeFormatted = endTime.format(DateTimeFormatter.ofPattern("MMM dd, yyyy hh:mm a"));

        assertThat(capturedMessage.getTo()).containsExactly(toEmail);
        assertThat(capturedMessage.getFrom()).isEqualTo("no-reply@swipe4me.com");
        assertThat(capturedMessage.getSubject()).isEqualTo("Swipe4Me - Availability Cancelled");
        assertThat(capturedMessage.getText())
                .contains("Unfortunately, a swipe session you registered for has been cancelled");
        assertThat(capturedMessage.getText()).contains("Location: " + DiningLocation.COMMONS);
        assertThat(capturedMessage.getText())
                .contains("Time: " + expectedStartTimeFormatted + " to " + expectedEndTimeFormatted);
        assertThat(capturedMessage.getText()).contains(SWIPE4ME_URL + "/getSwipes");
    }

    @Test
    void sendAvailabilityDeletedEmail_WithDifferentLocation_ShouldIncludeCorrectLocation() {
        // Given
        String toEmail = "buyer2@example.com";
        LocalDateTime startTime = LocalDateTime.now();
        LocalDateTime endTime = startTime.plusHours(2);

        UserEntity seller = UserEntity.builder()
                .firstName("Jane")
                .lastName("Smith")
                .email("jane@example.com")
                .build();

        AvailabilityEntity availability = AvailabilityEntity.builder()
                .user(seller)
                .location(DiningLocation.RAND)
                .startTime(startTime)
                .endTime(endTime)
                .build();

        // When
        emailService.sendAvailabilityDeletedEmail(availability, toEmail);

        // Then
        verify(javaMailSender).send(messageCaptor.capture());
        SimpleMailMessage capturedMessage = messageCaptor.getValue();

        assertThat(capturedMessage.getText()).contains("Location: " + DiningLocation.RAND);
        assertThat(capturedMessage.getTo()).containsExactly(toEmail);
        assertThat(capturedMessage.getFrom()).isEqualTo("no-reply@swipe4me.com");
        assertThat(capturedMessage.getSubject()).isEqualTo("Swipe4Me - Availability Cancelled");
    }
    @Test
    void sendInvitationAcceptedEmail_ShouldSendCorrectEmail() {
        // Given
        String toEmail = "buyer3@example.com";
        LocalDateTime startTime = LocalDateTime.of(2025, 4, 12, 13, 0);
        LocalDateTime endTime = LocalDateTime.of(2025, 4, 12, 14, 0);

        AvailabilityEntity availability = AvailabilityEntity.builder()
                .location(DiningLocation.RAND)
                .startTime(startTime)
                .endTime(endTime)
                .build();

        // When
        emailService.sendInvitationAcceptedEmail(availability, toEmail);

        // Then
        verify(javaMailSender).send(messageCaptor.capture());
        SimpleMailMessage message = messageCaptor.getValue();

        String formattedStart = startTime.format(DateTimeFormatter.ofPattern("MMM dd, yyyy hh:mm a"));
        String formattedEnd = endTime.format(DateTimeFormatter.ofPattern("MMM dd, yyyy hh:mm a"));

        assertThat(message.getTo()).containsExactly(toEmail);
        assertThat(message.getFrom()).isEqualTo("no-reply@swipe4me.com");
        assertThat(message.getSubject()).isEqualTo("Swipe4Me - Invitation Accepted");
        assertThat(message.getText()).contains("Location: " + DiningLocation.RAND);
        assertThat(message.getText()).contains("Time: " + formattedStart + " to " + formattedEnd);
        assertThat(message.getText()).contains(SWIPE4ME_URL + "/getSwipes");
    }


}