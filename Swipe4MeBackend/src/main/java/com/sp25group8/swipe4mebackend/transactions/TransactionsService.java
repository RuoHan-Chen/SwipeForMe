// Author: Jerry Wei, Steven Yi
// Time spent: 2 hours

package com.sp25group8.swipe4mebackend.transactions;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sp25group8.swipe4mebackend.availability.AvailabilityRepository;
import com.sp25group8.swipe4mebackend.emails.EmailService;
import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;
import com.sp25group8.swipe4mebackend.models.ratings.RatingDto;
import com.sp25group8.swipe4mebackend.models.ratings.RatingEntity;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionDto;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionEntity;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionStatus;
import com.sp25group8.swipe4mebackend.models.users.UserDto;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import com.sp25group8.swipe4mebackend.ratings.RatingRepository;
import com.sp25group8.swipe4mebackend.ratings.RatingService;
import com.sp25group8.swipe4mebackend.users.UserRepository;
import com.sp25group8.swipe4mebackend.users.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionsService {

    private final TransactionsRepository transactionRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final AvailabilityRepository availabilityRepository;
    private final RatingService ratingService;
    private final RatingRepository ratingRepository;

    // create transaction
    public TransactionDto createTransaction(
            Long buyerId,
            Long sellerId,
            Long availabilityId,
            TransactionStatus status) {
        // Send email to seller to notify them of the new transaction
        sendInvitationNotificationEmail(sellerId);

        UserEntity buyer = userRepository.findById(buyerId).orElseThrow();
        UserEntity seller = userRepository.findById(sellerId).orElseThrow();
        AvailabilityEntity availability = availabilityRepository.findById(availabilityId)
                .orElseThrow();

        TransactionEntity transaction = TransactionEntity.builder()
                .buyer(buyer)
                .seller(seller)
                .availability(availability)
                .status(status)
                .build();

        TransactionEntity savedTransactionEntity = transactionRepository.save(transaction);

        ratingService.createRating(savedTransactionEntity.getId());

        return TransactionDto.fromEntity(savedTransactionEntity);
    }

    // 根据 ID 获取交易
    public TransactionDto getTransactionById(Long transactionId) {
        return TransactionDto.fromEntity(transactionRepository.findById(transactionId).orElseThrow());
    }

    public RatingDto getRatingByTransactionId(Long transactionId) {
        TransactionEntity transactionEntity = transactionRepository.findById(transactionId).orElseThrow();
        RatingEntity ratingEntity = ratingRepository.findByTransaction_Id(transactionId);

        return RatingDto.fromEntity(ratingEntity);
    }

    // 获取用户的所有交易（作为买家）
    public List<TransactionDto> getTransactionsByBuyer(Long buyerId) {
        return transactionRepository.findByBuyer_Id(buyerId).stream().map(TransactionDto::fromEntity).toList();
    }

    // 获取用户的所有交易（作为卖家）
    public List<TransactionDto> getTransactionsBySeller(Long sellerId) {
        return transactionRepository.findBySeller_Id(sellerId).stream().map(TransactionDto::fromEntity).toList();
    }

    public TransactionDto updateTransactionStatus(Long transactionId, TransactionStatus status) {
        Optional<TransactionEntity> transactionOptional = transactionRepository.findById(transactionId);
        TransactionEntity transaction = transactionOptional.orElseThrow();
        transaction.setStatus(status);
        if (status == TransactionStatus.IN_PROGRESS) {
            transactionRepository.save(transaction);

            AvailabilityEntity availability = transaction.getAvailability();
            String buyerEmail = transaction.getBuyer().getEmail();
            emailService.sendInvitationAcceptedEmail(availability, buyerEmail);

        }
        return TransactionDto.fromEntity(transactionRepository.save(transaction));
    }

    private void sendInvitationNotificationEmail(Long sellerId) {
        UserDto seller = userService.getUserById(sellerId);
        emailService.sendInvitationNotificationEmail(seller.email());
    }
}
