package com.sp25group8.swipe4mebackend.emails;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;

import lombok.AllArgsConstructor;
import java.time.format.DateTimeFormatter;

@Service
@AllArgsConstructor
public class EmailService {

    private final String SWIPE4ME_URL = "https://swipe-for-me.vercel.app";

    private final JavaMailSender javaMailSender;

    public void sendInvitationNotificationEmail(String to) {
        final String SUBJECT = "Swipe4Me - New Invitation";
        final String TEXT = String.format("""
                Hey Swiper!

                Someone has invited you to swipe for them!
                You can accept or reject the invitation in your dashboard:
                %s/dashboard

                Best,
                The Swipe4Me Team
                """,
                SWIPE4ME_URL);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@swipe4me.com");
        message.setTo(to);
        message.setSubject(SUBJECT);
        message.setText(TEXT);

        javaMailSender.send(message);
    }

    public void sendAvailabilityDeletedEmail(AvailabilityEntity availability, String to) {
        final String SUBJECT = "Swipe4Me - Availability Cancelled";
        final String TEXT = String.format("""
                Hey Swiper!

                Unfortunately, a swipe session you registered for has been cancelled.

                Details:
                Location: %s
                Time: %s to %s

                Please check the Swipe4Me website for other available options:
                %s/getSwipes

                Best,
                The Swipe4Me Team
                """,
                availability.getLocation(),
                availability.getStartTime().format(DateTimeFormatter.ofPattern("MMM dd, yyyy hh:mm a")),
                availability.getEndTime().format(DateTimeFormatter.ofPattern("MMM dd, yyyy hh:mm a")),
                SWIPE4ME_URL);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@swipe4me.com");
        message.setTo(to);
        message.setSubject(SUBJECT);
        message.setText(TEXT);

        javaMailSender.send(message);
    }

}
