package com.sp25group8.swipe4mebackend.transactions;

import com.sp25group8.swipe4mebackend.transactions.models.TransactionEntity;
import com.sp25group8.swipe4mebackend.transactions.models.TransactionStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;



import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionsService {

    private final TransactionsRepository transactionRepository;

    // 创建交易
    public TransactionEntity createTransaction(TransactionEntity transaction) {
        transaction.setStatus(TransactionStatus.PENDING);
        transaction.setCreatedAt(LocalDateTime.now());
        transaction.setUpdatedAt(LocalDateTime.now());
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

    // 更新交易状态
    public Optional<TransactionEntity> updateTransactionStatus(Long transactionId, TransactionStatus status) {
        Optional<TransactionEntity> transactionOptional = transactionRepository.findById(transactionId);
        if (transactionOptional.isPresent()) {
            TransactionEntity transaction = transactionOptional.get();
            transaction.setStatus(status);
            transaction.setUpdatedAt(LocalDateTime.now());
            return Optional.of(transactionRepository.save(transaction));
        }
        return Optional.empty();
    }

    // 取消交易
    public boolean cancelTransaction(Long transactionId) {
        Optional<TransactionEntity> transactionOptional = transactionRepository.findById(transactionId);
        if (transactionOptional.isPresent()) {
            TransactionEntity transaction = transactionOptional.get();
            transaction.setStatus(TransactionStatus.CANCELLED);
            transaction.setUpdatedAt(LocalDateTime.now());
            transactionRepository.save(transaction);
            return true;
        }
        return false;
    }
}

