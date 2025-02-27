package com.sp25group8.swipe4mebackend.transactions;

import com.sp25group8.swipe4mebackend.models.transactions.TransactionEntity;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionStatus;
import lombok.RequiredArgsConstructor;
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
     * @param transaction
     * @return
     */
    @PostMapping("")
    public TransactionEntity createTransaction(@RequestBody TransactionEntity transaction) {
        return transactionsService.createTransaction(transaction);
    }

    @GetMapping("/buyer/{buyerId}")
    public List<TransactionEntity> getTransactionsByBuyer(@PathVariable Long buyerId) {
        return transactionsService.getTransactionsByBuyer(buyerId);
    }

    @GetMapping("/seller/{sellerId}")
    public List<TransactionEntity> getTransactionsBySeller(@PathVariable Long sellerId) {
        return transactionsService.getTransactionsBySeller(sellerId);
    }

    @PutMapping("/{transactionId}/status")
    public Optional<TransactionEntity> updateTransactionStatus(@PathVariable Long transactionId,
                                                               @RequestParam TransactionStatus status) {
        return transactionsService.updateTransactionStatus(transactionId, status);
    }

}
