package com.sp25group8.swipe4mebackend.transactions;

import com.sp25group8.swipe4mebackend.models.transactions.TransactionEntity;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionsController {

    /**
     * Creates a new transaction
     * @param transaction
     * @return
     */
    @PostMapping("/new")
    public TransactionEntity createTransaction(@RequestBody TransactionEntity transaction) {
        return null;  // TODO: implement this method
    }

    /**
     * Fetches all transactions with the CREATED status
     * @return
     */
    @GetMapping("/available")
    public List<TransactionEntity> getAllAvailableTransactions() {
        return List.of();  // TODO: implement this method
    }

    /**
     * Updates the status of the transaction with given id
     * @param id
     * @param status
     * @return
     */
    @PutMapping()
    public TransactionEntity updateTransaction(@RequestParam Integer id, @RequestParam TransactionStatus status) {
        return null;  // TODO: implement this method
    }

}
