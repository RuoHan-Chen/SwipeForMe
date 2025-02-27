package com.sp25group8.swipe4mebackend.transactions;


import com.sp25group8.swipe4mebackend.transactions.models.TransactionEntity;
import com.sp25group8.swipe4mebackend.transactions.models.TransactionStatus;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionsRepository extends CrudRepository<TransactionEntity, Long> {
    List<TransactionEntity> findByBuyerId(Long buyerId);
    List<TransactionEntity> findBySellerId(Long sellerId);
    List<TransactionEntity> findByStatus(TransactionStatus status);
}

