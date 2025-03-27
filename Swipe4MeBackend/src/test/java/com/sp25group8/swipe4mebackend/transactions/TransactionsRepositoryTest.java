package com.sp25group8.swipe4mebackend.transactions;

import com.sp25group8.swipe4mebackend.config.BaseRepositoryTest;
import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;
import com.sp25group8.swipe4mebackend.models.enums.DiningLocation;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionEntity;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionStatus;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class TransactionsRepositoryTest extends BaseRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private TransactionsRepository transactionsRepository;

    @Test
    public void testFindByBuyer_Id_ShouldReturnTransactions() {
        // Create test users
        UserEntity buyer = UserEntity.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john@example.com")
                .build();

        UserEntity seller = UserEntity.builder()
                .firstName("Jane")
                .lastName("Smith")
                .email("jane@example.com")
                .build();

        entityManager.persist(buyer);
        entityManager.persist(seller);

        // Create test availability
        LocalDateTime now = LocalDateTime.now();
        AvailabilityEntity availability = AvailabilityEntity.builder()
                .user(seller)
                .location(DiningLocation.COMMONS)
                .startTime(now)
                .endTime(now.plusHours(2))
                .build();

        entityManager.persist(availability);

        // Create transactions
        TransactionEntity transaction1 = TransactionEntity.builder()
                .buyer(buyer)
                .seller(seller)
                .availability(availability)
                .status(TransactionStatus.PENDING)
                .build();

        TransactionEntity transaction2 = TransactionEntity.builder()
                .buyer(buyer)
                .seller(seller)
                .availability(availability)
                .status(TransactionStatus.IN_PROGRESS)
                .build();

        // Create a transaction with a different buyer
        UserEntity anotherBuyer = UserEntity.builder()
                .firstName("Bob")
                .lastName("Johnson")
                .email("bob@example.com")
                .build();
        entityManager.persist(anotherBuyer);

        TransactionEntity transaction3 = TransactionEntity.builder()
                .buyer(anotherBuyer)
                .seller(seller)
                .availability(availability)
                .status(TransactionStatus.COMPLETED)
                .build();

        entityManager.persist(transaction1);
        entityManager.persist(transaction2);
        entityManager.persist(transaction3);
        entityManager.flush();

        // Test repository method
        List<TransactionEntity> transactions = transactionsRepository.findByBuyer_Id(buyer.getId());

        // Assertions
        assertThat(transactions).hasSize(2);
        assertThat(transactions).extracting("status")
                .containsExactlyInAnyOrder(TransactionStatus.PENDING, TransactionStatus.IN_PROGRESS);
        assertThat(transactions).extracting("buyer.id")
                .containsOnly(buyer.getId());
    }

    @Test
    public void testFindBySeller_Id_ShouldReturnTransactions() {
        // Create test users
        UserEntity buyer1 = UserEntity.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john@example.com")
                .build();

        UserEntity buyer2 = UserEntity.builder()
                .firstName("Alice")
                .lastName("Brown")
                .email("alice@example.com")
                .build();

        UserEntity seller = UserEntity.builder()
                .firstName("Jane")
                .lastName("Smith")
                .email("jane@example.com")
                .build();

        entityManager.persist(buyer1);
        entityManager.persist(buyer2);
        entityManager.persist(seller);

        // Create test availability
        LocalDateTime now = LocalDateTime.now();
        AvailabilityEntity availability = AvailabilityEntity.builder()
                .user(seller)
                .location(DiningLocation.COMMONS)
                .startTime(now)
                .endTime(now.plusHours(2))
                .build();

        entityManager.persist(availability);

        // Create transactions
        TransactionEntity transaction1 = TransactionEntity.builder()
                .buyer(buyer1)
                .seller(seller)
                .availability(availability)
                .status(TransactionStatus.PENDING)
                .build();

        TransactionEntity transaction2 = TransactionEntity.builder()
                .buyer(buyer2)
                .seller(seller)
                .availability(availability)
                .status(TransactionStatus.COMPLETED)
                .build();

        // Create a transaction with a different seller
        UserEntity anotherSeller = UserEntity.builder()
                .firstName("Dave")
                .lastName("Wilson")
                .email("dave@example.com")
                .build();
        entityManager.persist(anotherSeller);

        TransactionEntity transaction3 = TransactionEntity.builder()
                .buyer(buyer1)
                .seller(anotherSeller)
                .availability(availability)
                .status(TransactionStatus.REJECTED)
                .build();

        entityManager.persist(transaction1);
        entityManager.persist(transaction2);
        entityManager.persist(transaction3);
        entityManager.flush();

        // Test repository method
        List<TransactionEntity> transactions = transactionsRepository.findBySeller_Id(seller.getId());

        // Assertions
        assertThat(transactions).hasSize(2);
        assertThat(transactions).extracting("status")
                .containsExactlyInAnyOrder(TransactionStatus.PENDING, TransactionStatus.COMPLETED);
        assertThat(transactions).extracting("seller.id")
                .containsOnly(seller.getId());
    }

    @Test
    public void testFindByStatus_ShouldReturnTransactions() {
        // Create test users
        UserEntity buyer = UserEntity.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john@example.com")
                .build();

        UserEntity seller = UserEntity.builder()
                .firstName("Jane")
                .lastName("Smith")
                .email("jane@example.com")
                .build();

        entityManager.persist(buyer);
        entityManager.persist(seller);

        // Create test availability
        LocalDateTime now = LocalDateTime.now();
        AvailabilityEntity availability = AvailabilityEntity.builder()
                .user(seller)
                .location(DiningLocation.COMMONS)
                .startTime(now)
                .endTime(now.plusHours(2))
                .build();

        entityManager.persist(availability);

        // Create transactions with different statuses
        TransactionEntity pendingTransaction = TransactionEntity.builder()
                .buyer(buyer)
                .seller(seller)
                .availability(availability)
                .status(TransactionStatus.PENDING)
                .build();

        TransactionEntity inProgressTransaction = TransactionEntity.builder()
                .buyer(buyer)
                .seller(seller)
                .availability(availability)
                .status(TransactionStatus.IN_PROGRESS)
                .build();

        TransactionEntity completedTransaction = TransactionEntity.builder()
                .buyer(buyer)
                .seller(seller)
                .availability(availability)
                .status(TransactionStatus.COMPLETED)
                .build();

        TransactionEntity anotherPendingTransaction = TransactionEntity.builder()
                .buyer(buyer)
                .seller(seller)
                .availability(availability)
                .status(TransactionStatus.PENDING)
                .build();

        entityManager.persist(pendingTransaction);
        entityManager.persist(inProgressTransaction);
        entityManager.persist(completedTransaction);
        entityManager.persist(anotherPendingTransaction);
        entityManager.flush();

        // Test repository method for PENDING status
        List<TransactionEntity> pendingTransactions = transactionsRepository.findByStatus(TransactionStatus.PENDING);

        // Assertions
        assertThat(pendingTransactions).hasSize(2);
        assertThat(pendingTransactions).extracting("status")
                .containsOnly(TransactionStatus.PENDING);

        // Test repository method for COMPLETED status
        List<TransactionEntity> completedTransactions = transactionsRepository
                .findByStatus(TransactionStatus.COMPLETED);

        // Assertions
        assertThat(completedTransactions).hasSize(1);
        assertThat(completedTransactions).extracting("status")
                .containsOnly(TransactionStatus.COMPLETED);
    }

    @Test
    public void testFindByBuyer_Id_WhenNoTransactions_ShouldReturnEmptyList() {
        // Create a user without transactions
        UserEntity user = UserEntity.builder()
                .firstName("Alice")
                .lastName("Johnson")
                .email("alice@example.com")
                .build();

        entityManager.persist(user);
        entityManager.flush();

        // Test repository method
        List<TransactionEntity> transactions = transactionsRepository.findByBuyer_Id(user.getId());

        // Assertions
        assertThat(transactions).isEmpty();
    }

    @Test
    public void testFindBySeller_Id_WhenNoTransactions_ShouldReturnEmptyList() {
        // Create a user without transactions
        UserEntity user = UserEntity.builder()
                .firstName("Alice")
                .lastName("Johnson")
                .email("alice@example.com")
                .build();

        entityManager.persist(user);
        entityManager.flush();

        // Test repository method
        List<TransactionEntity> transactions = transactionsRepository.findBySeller_Id(user.getId());

        // Assertions
        assertThat(transactions).isEmpty();
    }

    @Test
    public void testFindByStatus_WhenNoMatchingTransactions_ShouldReturnEmptyList() {
        // Create test users
        UserEntity buyer = UserEntity.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john@example.com")
                .build();

        UserEntity seller = UserEntity.builder()
                .firstName("Jane")
                .lastName("Smith")
                .email("jane@example.com")
                .build();

        entityManager.persist(buyer);
        entityManager.persist(seller);

        // Create test availability
        LocalDateTime now = LocalDateTime.now();
        AvailabilityEntity availability = AvailabilityEntity.builder()
                .user(seller)
                .location(DiningLocation.COMMONS)
                .startTime(now)
                .endTime(now.plusHours(2))
                .build();

        entityManager.persist(availability);

        // Create only pending transactions
        TransactionEntity pendingTransaction1 = TransactionEntity.builder()
                .buyer(buyer)
                .seller(seller)
                .availability(availability)
                .status(TransactionStatus.PENDING)
                .build();

        TransactionEntity pendingTransaction2 = TransactionEntity.builder()
                .buyer(buyer)
                .seller(seller)
                .availability(availability)
                .status(TransactionStatus.PENDING)
                .build();

        entityManager.persist(pendingTransaction1);
        entityManager.persist(pendingTransaction2);
        entityManager.flush();

        // Test repository method for REJECTED status (which doesn't exist)
        List<TransactionEntity> rejectedTransactions = transactionsRepository.findByStatus(TransactionStatus.REJECTED);

        // Assertions
        assertThat(rejectedTransactions).isEmpty();
    }
}