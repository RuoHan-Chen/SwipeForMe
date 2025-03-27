package com.sp25group8.swipe4mebackend.transactions;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityDto;
import com.sp25group8.swipe4mebackend.models.enums.DiningLocation;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionDto;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionStatus;
import com.sp25group8.swipe4mebackend.models.users.UserDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class TransactionsControllerTest {

    private MockMvc mockMvc;

    @Mock
    private TransactionsService transactionsService;

    @InjectMocks
    private TransactionsController transactionsController;

    private UserDto buyer;
    private UserDto seller;
    private AvailabilityDto availability;
    private TransactionDto transactionDto;
    private LocalDateTime now;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(transactionsController).build();

        // Setup common test data
        now = LocalDateTime.now();

        buyer = new UserDto(
                1L,
                "John",
                "Doe",
                "john@example.com",
                "123-456-7890",
                4.5,
                "https://example.com/buyer.jpg");

        seller = new UserDto(
                2L,
                "Jane",
                "Smith",
                "jane@example.com",
                "987-654-3210",
                4.8,
                "https://example.com/seller.jpg");

        availability = new AvailabilityDto(
                1L,
                seller,
                DiningLocation.COMMONS,
                now,
                now.plusHours(2));

        transactionDto = new TransactionDto(
                1L,
                availability,
                buyer,
                seller,
                TransactionStatus.PENDING);
    }

    @Test
    void testCreateTransaction_ShouldReturnCreatedTransaction() throws Exception {
        // Given
        when(transactionsService.createTransaction(
                eq(buyer.id()),
                eq(seller.id()),
                eq(availability.id()),
                eq(TransactionStatus.PENDING)))
                .thenReturn(transactionDto);

        // When/Then
        mockMvc.perform(post("/transactions")
                .param("buyerId", buyer.id().toString())
                .param("sellerId", seller.id().toString())
                .param("availabilityId", availability.id().toString())
                .param("status", TransactionStatus.PENDING.toString())
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(transactionDto.id()))
                .andExpect(jsonPath("$.buyer.id").value(buyer.id()))
                .andExpect(jsonPath("$.seller.id").value(seller.id()))
                .andExpect(jsonPath("$.availability.id").value(availability.id()))
                .andExpect(jsonPath("$.status").value(TransactionStatus.PENDING.toString()));
    }

    @Test
    void testGetTransactionsByBuyer_ShouldReturnTransactionsList() throws Exception {
        // Given
        List<TransactionDto> transactions = Arrays.asList(
                transactionDto,
                new TransactionDto(2L, availability, buyer, seller, TransactionStatus.COMPLETED));

        when(transactionsService.getTransactionsByBuyer(buyer.id())).thenReturn(transactions);

        // When/Then
        mockMvc.perform(get("/transactions/buyer/{buyerId}", buyer.id())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(transactions.get(0).id()))
                .andExpect(jsonPath("$[0].status").value(TransactionStatus.PENDING.toString()))
                .andExpect(jsonPath("$[1].id").value(transactions.get(1).id()))
                .andExpect(jsonPath("$[1].status").value(TransactionStatus.COMPLETED.toString()));
    }

    @Test
    void testGetTransactionsByBuyer_WhenNoTransactions_ShouldReturnEmptyList() throws Exception {
        // Given
        when(transactionsService.getTransactionsByBuyer(buyer.id())).thenReturn(Collections.emptyList());

        // When/Then
        mockMvc.perform(get("/transactions/buyer/{buyerId}", buyer.id())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    void testGetTransactionsBySeller_ShouldReturnTransactionsList() throws Exception {
        // Given
        List<TransactionDto> transactions = Arrays.asList(
                transactionDto,
                new TransactionDto(2L, availability, buyer, seller, TransactionStatus.IN_PROGRESS));

        when(transactionsService.getTransactionsBySeller(seller.id())).thenReturn(transactions);

        // When/Then
        mockMvc.perform(get("/transactions/seller/{sellerId}", seller.id())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(transactions.get(0).id()))
                .andExpect(jsonPath("$[0].status").value(TransactionStatus.PENDING.toString()))
                .andExpect(jsonPath("$[1].id").value(transactions.get(1).id()))
                .andExpect(jsonPath("$[1].status").value(TransactionStatus.IN_PROGRESS.toString()));
    }

    @Test
    void testGetTransactionsBySeller_WhenNoTransactions_ShouldReturnEmptyList() throws Exception {
        // Given
        when(transactionsService.getTransactionsBySeller(seller.id())).thenReturn(Collections.emptyList());

        // When/Then
        mockMvc.perform(get("/transactions/seller/{sellerId}", seller.id())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    void testUpdateTransactionStatus_ShouldReturnUpdatedTransaction() throws Exception {
        // Given
        TransactionDto updatedTransaction = new TransactionDto(
                transactionDto.id(),
                transactionDto.availability(),
                transactionDto.buyer(),
                transactionDto.seller(),
                TransactionStatus.COMPLETED);

        when(transactionsService.updateTransactionStatus(
                eq(transactionDto.id()),
                eq(TransactionStatus.COMPLETED)))
                .thenReturn(updatedTransaction);

        // When/Then
        mockMvc.perform(put("/transactions/{transactionId}/status", transactionDto.id())
                .param("status", TransactionStatus.COMPLETED.toString())
                .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(transactionDto.id()))
                .andExpect(jsonPath("$.buyer.id").value(buyer.id()))
                .andExpect(jsonPath("$.seller.id").value(seller.id()))
                .andExpect(jsonPath("$.status").value(TransactionStatus.COMPLETED.toString()));
    }
}