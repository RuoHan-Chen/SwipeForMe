// Author: Jerry Wei, Steven Yi
// Time spent: 3 hours

package com.sp25group8.swipe4mebackend.transactions;

import com.sp25group8.swipe4mebackend.models.transactions.TransactionEntity;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionStatus;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionWithAvailability;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionsController {

    private final TransactionsService transactionsService;

    /**
     * Creates a new transaction
     * 
     * @param transaction
     * @return
     */
    @PostMapping
    public ResponseEntity<TransactionEntity> createTransaction(@RequestBody TransactionEntity transaction) {
        return ResponseEntity.ok(transactionsService.createTransaction(transaction));
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<TransactionEntity>> getTransactionsByBuyer(@PathVariable Long buyerId) {
        return ResponseEntity.ok(transactionsService.getTransactionsByBuyer(buyerId));
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<TransactionEntity>> getTransactionsBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(transactionsService.getTransactionsBySeller(sellerId));
    }

    @PutMapping("/{transactionId}/status")
    public ResponseEntity<TransactionEntity> updateTransactionStatus(@PathVariable Long transactionId,
            @RequestParam TransactionStatus status) {
        return ResponseEntity.ok(transactionsService.updateTransactionStatus(transactionId, status));
    }

    @GetMapping("/with-availability/buyer/{buyerId}")
    public ResponseEntity<List<TransactionWithAvailability>> getTransactionsByBuyerWithAvailability(
            @PathVariable Long buyerId) {
        return ResponseEntity.ok(transactionsService.getTransactionsByBuyerWithAvailability(buyerId));
    }

    @GetMapping("/with-availability/seller/{sellerId}")
    public ResponseEntity<List<TransactionWithAvailability>> getTransactionsBySellerWithAvailability(
            @PathVariable Long sellerId) {
        return ResponseEntity.ok(transactionsService.getTransactionsBySellerWithAvailability(sellerId));
    }

    @GetMapping("/with-availability/{transactionId}")
    public ResponseEntity<TransactionWithAvailability> getTransactionWithAvailability(
            @PathVariable Long transactionId) {
        return ResponseEntity.ok(transactionsService.getTransactionWithAvailability(transactionId));
    }
}