// Author: Jerry Wei, Steven Yi
// Time spent: 3 hours

package com.sp25group8.swipe4mebackend.transactions;

import com.sp25group8.swipe4mebackend.models.transactions.CreateTransactionDto;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionDto;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionEntity;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionStatus;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<TransactionDto> createTransaction(
            @RequestParam Long buyerId,
            @RequestParam Long sellerId,
            @RequestParam Long availabilityId,
            @RequestParam TransactionStatus status) {
        return ResponseEntity.ok(transactionsService.createTransaction(buyerId, sellerId, availabilityId, status));
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<TransactionDto>> getTransactionsByBuyer(@PathVariable Long buyerId) {
        return ResponseEntity.ok(transactionsService.getTransactionsByBuyer(buyerId));
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<TransactionDto>> getTransactionsBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(transactionsService.getTransactionsBySeller(sellerId));
    }

    @PutMapping("/{transactionId}/status")
    public ResponseEntity<TransactionDto> updateTransactionStatus(@PathVariable Long transactionId,
            @RequestParam TransactionStatus status) {
        return ResponseEntity.ok(transactionsService.updateTransactionStatus(transactionId, status));
    }
}