// Author: Jerry Wei, Steven Yi
// Time spent: 2 hours

package com.sp25group8.swipe4mebackend.transactions;

import com.sp25group8.swipe4mebackend.emails.EmailService;
import com.sp25group8.swipe4mebackend.models.dtos.UserDto;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionEntity;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionStatus;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionWithAvailability;
import com.sp25group8.swipe4mebackend.users.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionsService {

    private final TransactionsRepository transactionRepository;
    private final UserService userService;
    private final EmailService emailService;

    // 创建交易
    public TransactionEntity createTransaction(TransactionEntity transaction) {
        // Send email to seller to notify them of the new transaction
        sendInvitationNotificationEmail(transaction.sellerId());

        return transactionRepository.save(transaction);
    }

    // 根据 ID 获取交易
    public Optional<TransactionEntity> getTransactionById(Long transactionId) {
        return transactionRepository.findById(transactionId);
    }

    // 获取用户的所有交易（作为买家）
    public List<TransactionEntity> getTransactionsByBuyer(Long buyerId) {
        return transactionRepository.findByBuyerId(buyerId);
    }

    // 获取用户的所有交易（作为卖家）
    public List<TransactionEntity> getTransactionsBySeller(Long sellerId) {
        return transactionRepository.findBySellerId(sellerId);
    }

    public List<TransactionWithAvailability> getTransactionsWithAvailability() {
        return transactionRepository.findAllTransactionsWithAvailabilities();
    }

    public List<TransactionWithAvailability> getTransactionsByBuyerWithAvailability(Long buyerId) {
        return transactionRepository.findByBuyerIdWithAvailability(buyerId);
    }

    public List<TransactionWithAvailability> getTransactionsBySellerWithAvailability(Long sellerId) {
        return transactionRepository.findBySellerIdWithAvailability(sellerId);
    }

    public TransactionWithAvailability getTransactionWithAvailability(Long transactionId) {
        return transactionRepository.findTransactionWithAvailability(transactionId);
    }

    // 更新交易状态
    public TransactionEntity updateTransactionStatus(Long transactionId, TransactionStatus status) {
        Optional<TransactionEntity> transactionOptional = transactionRepository.findById(transactionId);
        TransactionEntity transaction = transactionOptional.orElseThrow();
        TransactionEntity updatedTx = new TransactionEntity(
                transaction.id(),
                transaction.availabilityId(),
                transaction.buyerId(),
                transaction.sellerId(),
                status);
        return transactionRepository.save(updatedTx);
    }

    private void sendInvitationNotificationEmail(Long sellerId) {
        UserDto seller = userService.getUserById(sellerId);
        emailService.sendInvitationNotificationEmail(seller.email());
    }
}
