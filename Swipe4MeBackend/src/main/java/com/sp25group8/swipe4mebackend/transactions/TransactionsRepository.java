// Author: Jerry Wei
// Time spent: 1 hours

package com.sp25group8.swipe4mebackend.transactions;

import com.sp25group8.swipe4mebackend.models.transactions.TransactionEntity;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionStatus;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionWithUsersAndAvailability;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionsRepository extends CrudRepository<TransactionEntity, Long> {
    List<TransactionEntity> findByBuyerId(Long buyerId);

    List<TransactionEntity> findBySellerId(Long sellerId);

    List<TransactionEntity> findByStatus(TransactionStatus status);

    @Query("SELECT t.*, a.*, buyer.*, seller.* FROM transactions t " +
            "JOIN availabilities a ON t.availability_id = a.id " +
            "JOIN users buyer ON t.buyer_id = buyer.id " +
            "JOIN users seller ON t.seller_id = seller.id " +
            "WHERE t.id = :transactionId")
    TransactionWithUsersAndAvailability findTransactionWithUsersAndAvailability(
            @Param("transactionId") Long transactionId);

    @Query("SELECT t.*, a.*, buyer.*, seller.* FROM transactions t " +
            "JOIN availabilities a ON t.availability_id = a.id " +
            "JOIN users buyer ON t.buyer_id = buyer.id " +
            "JOIN users seller ON t.seller_id = seller.id")
    List<TransactionWithUsersAndAvailability> findAllTransactionsWithUsersAndAvailabilities();

    @Query("SELECT t.*, a.*, buyer.*, seller.* FROM transactions t " +
            "JOIN availabilities a ON t.availability_id = a.id " +
            "JOIN users buyer ON t.buyer_id = buyer.id " +
            "JOIN users seller ON t.seller_id = seller.id " +
            "WHERE t.buyer_id = :buyerId")
    List<TransactionWithUsersAndAvailability> findByBuyerIdWithUsersAndAvailability(@Param("buyerId") Long buyerId);

    @Query("SELECT t.*, a.*, buyer.*, seller.* FROM transactions t " +
            "JOIN availabilities a ON t.availability_id = a.id " +
            "JOIN users buyer ON t.buyer_id = buyer.id " +
            "JOIN users seller ON t.seller_id = seller.id " +
            "WHERE t.seller_id = :sellerId")
    List<TransactionWithUsersAndAvailability> findBySellerIdWithUsersAndAvailability(@Param("sellerId") Long sellerId);
}
