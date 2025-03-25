// Author: Jerry Wei
// Time spent: 1 hours

package com.sp25group8.swipe4mebackend.transactions;

import com.sp25group8.swipe4mebackend.models.transactions.TransactionEntity;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionsRepository extends JpaRepository<TransactionEntity, Long> {
	List<TransactionEntity> findByBuyer_Id(Long buyerId);

	List<TransactionEntity> findBySeller_Id(Long sellerId);

	List<TransactionEntity> findByStatus(TransactionStatus status);
}
