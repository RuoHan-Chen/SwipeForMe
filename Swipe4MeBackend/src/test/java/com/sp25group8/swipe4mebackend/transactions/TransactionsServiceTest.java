package com.sp25group8.swipe4mebackend.transactions;

import com.sp25group8.swipe4mebackend.availability.AvailabilityRepository;
import com.sp25group8.swipe4mebackend.emails.EmailService;
import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;
import com.sp25group8.swipe4mebackend.models.enums.DiningLocation;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionDto;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionEntity;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionStatus;
import com.sp25group8.swipe4mebackend.models.users.UserDto;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import com.sp25group8.swipe4mebackend.users.UserRepository;
import com.sp25group8.swipe4mebackend.users.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TransactionsServiceTest {

    @Mock
    private TransactionsRepository transactionsRepository;

    @Mock
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailService emailService;

    @Mock
    private AvailabilityRepository availabilityRepository;

    @InjectMocks
    private TransactionsService transactionsService;

    private UserEntity buyer;
    private UserEntity seller;
    private AvailabilityEntity availability;
    private TransactionEntity transaction;
    private UserDto sellerDto;

    @BeforeEach
    void setUp() {
        // Setup common test data
        LocalDateTime now = LocalDateTime.now();

        buyer = UserEntity.builder()
                .id(1L)
                .firstName("John")
                .lastName("Doe")
                .email("john@example.com")
                .build();

        seller = UserEntity.builder()
                .id(2L)
                .firstName("Jane")
                .lastName("Smith")
                .email("jane@example.com")
                .build();

        availability = AvailabilityEntity.builder()
                .id(1L)
                .user(seller)
                .location(DiningLocation.COMMONS)
                .startTime(now)
                .endTime(now.plusHours(2))
                .build();

        transaction = TransactionEntity.builder()
                .id(1L)
                .buyer(buyer)
                .seller(seller)
                .availability(availability)
                .status(TransactionStatus.PENDING)
                .build();

        sellerDto = new UserDto(
                seller.getId(),
                seller.getFirstName(),
                seller.getLastName(),
                seller.getEmail(),
                null,
                null,
                null);
    }

    @Test
    void testCreateTransaction_ShouldCreateAndReturnTransaction() {
        // Arrange
        when(userRepository.findById(buyer.getId())).thenReturn(Optional.of(buyer));
        when(userRepository.findById(seller.getId())).thenReturn(Optional.of(seller));
        when(availabilityRepository.findById(availability.getId())).thenReturn(Optional.of(availability));
        when(transactionsRepository.save(any(TransactionEntity.class))).thenReturn(transaction);
        when(userService.getUserById(seller.getId())).thenReturn(sellerDto);

        // Act
        TransactionDto result = transactionsService.createTransaction(
                buyer.getId(),
                seller.getId(),
                availability.getId(),
                TransactionStatus.PENDING);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.id()).isEqualTo(transaction.getId());
        assertThat(result.buyer().id()).isEqualTo(buyer.getId());
        assertThat(result.seller().id()).isEqualTo(seller.getId());
        assertThat(result.status()).isEqualTo(TransactionStatus.PENDING);

        // Verify interactions
        verify(userRepository).findById(buyer.getId());
        verify(userRepository).findById(seller.getId());
        verify(availabilityRepository).findById(availability.getId());
        verify(transactionsRepository).save(any(TransactionEntity.class));
        verify(emailService).sendInvitationNotificationEmail(seller.getEmail());
    }

    @Test
    void testGetTransactionById_WhenTransactionExists_ShouldReturnTransaction() {
        // Arrange
        when(transactionsRepository.findById(transaction.getId())).thenReturn(Optional.of(transaction));

        // Act
        Optional<TransactionDto> result = transactionsService.getTransactionById(transaction.getId());

        // Assert
        assertThat(result).isPresent();
        assertThat(result.get().id()).isEqualTo(transaction.getId());
        assertThat(result.get().buyer().id()).isEqualTo(buyer.getId());
        assertThat(result.get().seller().id()).isEqualTo(seller.getId());
        assertThat(result.get().status()).isEqualTo(TransactionStatus.PENDING);

        // Verify interactions
        verify(transactionsRepository).findById(transaction.getId());
    }

    @Test
    void testGetTransactionById_WhenTransactionDoesNotExist_ShouldReturnEmptyOptional() {
        // Arrange
        Long nonExistentId = 999L;
        when(transactionsRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        // Act
        Optional<TransactionDto> result = transactionsService.getTransactionById(nonExistentId);

        // Assert
        assertThat(result).isEmpty();

        // Verify interactions
        verify(transactionsRepository).findById(nonExistentId);
    }

    @Test
    void testGetTransactionsByBuyer_ShouldReturnTransactions() {
        // Arrange
        TransactionEntity transaction2 = TransactionEntity.builder()
                .id(2L)
                .buyer(buyer)
                .seller(seller)
                .availability(availability)
                .status(TransactionStatus.COMPLETED)
                .build();

        List<TransactionEntity> buyerTransactions = Arrays.asList(transaction, transaction2);

        when(transactionsRepository.findByBuyer_Id(buyer.getId())).thenReturn(buyerTransactions);

        // Act
        List<TransactionDto> result = transactionsService.getTransactionsByBuyer(buyer.getId());

        // Assert
        assertThat(result).hasSize(2);
        assertThat(result).extracting("id").containsExactly(1L, 2L);
        assertThat(result).extracting("status")
                .containsExactly(TransactionStatus.PENDING, TransactionStatus.COMPLETED);

        // Verify interactions
        verify(transactionsRepository).findByBuyer_Id(buyer.getId());
    }

    @Test
    void testGetTransactionsByBuyer_WhenNoTransactions_ShouldReturnEmptyList() {
        // Arrange
        when(transactionsRepository.findByBuyer_Id(buyer.getId())).thenReturn(Collections.emptyList());

        // Act
        List<TransactionDto> result = transactionsService.getTransactionsByBuyer(buyer.getId());

        // Assert
        assertThat(result).isEmpty();

        // Verify interactions
        verify(transactionsRepository).findByBuyer_Id(buyer.getId());
    }

    @Test
    void testGetTransactionsBySeller_ShouldReturnTransactions() {
        // Arrange
        TransactionEntity transaction2 = TransactionEntity.builder()
                .id(2L)
                .buyer(buyer)
                .seller(seller)
                .availability(availability)
                .status(TransactionStatus.IN_PROGRESS)
                .build();

        List<TransactionEntity> sellerTransactions = Arrays.asList(transaction, transaction2);

        when(transactionsRepository.findBySeller_Id(seller.getId())).thenReturn(sellerTransactions);

        // Act
        List<TransactionDto> result = transactionsService.getTransactionsBySeller(seller.getId());

        // Assert
        assertThat(result).hasSize(2);
        assertThat(result).extracting("id").containsExactly(1L, 2L);
        assertThat(result).extracting("status")
                .containsExactly(TransactionStatus.PENDING, TransactionStatus.IN_PROGRESS);

        // Verify interactions
        verify(transactionsRepository).findBySeller_Id(seller.getId());
    }

    @Test
    void testGetTransactionsBySeller_WhenNoTransactions_ShouldReturnEmptyList() {
        // Arrange
        when(transactionsRepository.findBySeller_Id(seller.getId())).thenReturn(Collections.emptyList());

        // Act
        List<TransactionDto> result = transactionsService.getTransactionsBySeller(seller.getId());

        // Assert
        assertThat(result).isEmpty();

        // Verify interactions
        verify(transactionsRepository).findBySeller_Id(seller.getId());
    }

    @Test
    void testUpdateTransactionStatus_ShouldUpdateAndReturnTransaction() {
        // Arrange
        TransactionEntity updatedTransaction = TransactionEntity.builder()
                .id(transaction.getId())
                .buyer(buyer)
                .seller(seller)
                .availability(availability)
                .status(TransactionStatus.COMPLETED)
                .build();

        when(transactionsRepository.findById(transaction.getId())).thenReturn(Optional.of(transaction));
        when(transactionsRepository.save(any(TransactionEntity.class))).thenReturn(updatedTransaction);

        // Act
        TransactionDto result = transactionsService.updateTransactionStatus(
                transaction.getId(),
                TransactionStatus.COMPLETED);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.id()).isEqualTo(transaction.getId());
        assertThat(result.status()).isEqualTo(TransactionStatus.COMPLETED);

        // Verify the transaction was saved with the updated status
        ArgumentCaptor<TransactionEntity> transactionCaptor = ArgumentCaptor.forClass(TransactionEntity.class);
        verify(transactionsRepository).save(transactionCaptor.capture());
        assertThat(transactionCaptor.getValue().getStatus()).isEqualTo(TransactionStatus.COMPLETED);
    }

    @Test
    void testSendInvitationNotificationEmail_ShouldSendEmail() throws Exception {
        // Arrange
        when(userService.getUserById(seller.getId())).thenReturn(sellerDto);

        // Act
        // This calls a private method, so we'll use reflection
        java.lang.reflect.Method method = TransactionsService.class.getDeclaredMethod(
                "sendInvitationNotificationEmail", Long.class);
        method.setAccessible(true);
        method.invoke(transactionsService, seller.getId());

        // Assert
        verify(userService).getUserById(seller.getId());
        verify(emailService).sendInvitationNotificationEmail(seller.getEmail());
    }
}