// Author: Jerry Wei, Steven Yi
// Time spent: 2 hours

package com.sp25group8.swipe4mebackend.transactions;

import com.sp25group8.swipe4mebackend.models.transactions.TransactionEntity;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionStatus;
import lombok.RequiredArgsConstructor;
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
    public TransactionEntity updateTransactionStatus(Long transactionId, TransactionStatus status) {
        Optional<TransactionEntity> transactionOptional = transactionRepository.findById(transactionId);
        TransactionEntity transaction = transactionOptional.orElseThrow();
        TransactionEntity updatedTx = new TransactionEntity(
                transaction.id(),
                transaction.availabilityId(),
                transaction.buyerId(),
                transaction.sellerId(),
                status
        );
        return transactionRepository.save(updatedTx);
    }
}

