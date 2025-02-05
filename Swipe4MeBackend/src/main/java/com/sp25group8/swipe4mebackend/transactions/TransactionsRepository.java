package com.sp25group8.swipe4mebackend.transactions;

import com.sp25group8.swipe4mebackend.transactions.models.TransactionEntity;
import org.springframework.data.repository.CrudRepository;

public interface TransactionsRepository extends CrudRepository<TransactionEntity, Long> {
}
