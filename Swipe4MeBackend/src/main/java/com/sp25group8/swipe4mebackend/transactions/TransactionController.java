package com.sp25group8.swipe4mebackend.transactions;

import java.util.List;

import com.sp25group8.swipe4mebackend.transactions.models.TransactionEntity;
import com.sp25group8.swipe4mebackend.transactions.models.TransactionService;
import com.sp25group8.swipe4mebackend.transactions.models.TransactionStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;


    @PostMapping
    public TransactionEntity createTransaction(@RequestBody TransactionEntity transaction) {
        return transactionService.createTransaction(transaction);
    }


    @GetMapping("/{transactionId}")
    public Optional<TransactionEntity> getTransactionById(@PathVariable Long transactionId) {
        return transactionService.getTransactionById(transactionId);
    }


    @GetMapping("/buyer/{buyerId}")
    public List<TransactionEntity> getTransactionsByBuyer(@PathVariable Long buyerId) {
        return transactionService.getTransactionsByBuyer(buyerId);
    }


    @GetMapping("/seller/{sellerId}")
    public List<TransactionEntity> getTransactionsBySeller(@PathVariable Long sellerId) {
        return transactionService.getTransactionsBySeller(sellerId);
    }


    @PutMapping("/{transactionId}/status")
    public Optional<TransactionEntity> updateTransactionStatus(@PathVariable Long transactionId,
                                                     @RequestParam TransactionStatus status) {
        return transactionService.updateTransactionStatus(transactionId, status);
    }


    @DeleteMapping("/{transactionId}")
    public void cancelTransaction(@PathVariable Long transactionId) {
        transactionService.cancelTransaction(transactionId);
    }
}
