package com.sp25group8.swipe4mebackend.emails;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    public void sendInvitationNotificationEmail(String to) {
        final String SUBJECT = "Swipe4Me - New Invitation";
        final String TEXT = """
                Hey Swiper!

                Someone has invited you to swipe for them!
                You can accept or reject the invitation in your dashboard:
                https://swipe4me.com/dashboard

                Best,
                The Swipe4Me Team
                """;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@swipe4me.com");
        message.setTo(to);
        message.setSubject(SUBJECT);
        message.setText(TEXT);

        javaMailSender.send(message);
    }

}
