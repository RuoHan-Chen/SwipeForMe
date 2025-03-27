package com.sp25group8.swipe4mebackend.availability;

import com.sp25group8.swipe4mebackend.config.BaseRepositoryTest;
import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;
import com.sp25group8.swipe4mebackend.models.enums.DiningLocation;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class AvailabilityRepositoryTest extends BaseRepositoryTest {

	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private AvailabilityRepository availabilityRepository;

	@Test
	public void testFindAllByUserId_ShouldReturnUserAvailabilities() {
		// Create test user
		UserEntity user1 = UserEntity.builder()
				.firstName("John")
				.lastName("Doe")
				.email("john@example.com")
				.build();

		UserEntity user2 = UserEntity.builder()
				.firstName("Jane")
				.lastName("Smith")
				.email("jane@example.com")
				.build();

		entityManager.persist(user1);
		entityManager.persist(user2);

		// Create availabilities for user1
		LocalDateTime now = LocalDateTime.now();
		AvailabilityEntity availability1 = AvailabilityEntity.builder()
				.user(user1)
				.location(DiningLocation.COMMONS)
				.startTime(now)
				.endTime(now.plusHours(2))
				.build();

		AvailabilityEntity availability2 = AvailabilityEntity.builder()
				.user(user1)
				.location(DiningLocation.ZEPPOS)
				.startTime(now.plusDays(1))
				.endTime(now.plusDays(1).plusHours(1))
				.build();

		// Create availability for user2
		AvailabilityEntity availability3 = AvailabilityEntity.builder()
				.user(user2)
				.location(DiningLocation.COMMONS)
				.startTime(now)
				.endTime(now.plusHours(3))
				.build();

		entityManager.persist(availability1);
		entityManager.persist(availability2);
		entityManager.persist(availability3);
		entityManager.flush();

		// Test repository method
		List<AvailabilityEntity> user1Availabilities = availabilityRepository.findAllByUserId(user1.getId());
		List<AvailabilityEntity> user2Availabilities = availabilityRepository.findAllByUserId(user2.getId());

		// Assertions
		assertThat(user1Availabilities).hasSize(2);
		assertThat(user1Availabilities).extracting("location")
				.containsExactlyInAnyOrder(DiningLocation.COMMONS, DiningLocation.ZEPPOS);

		assertThat(user2Availabilities).hasSize(1);
		assertThat(user2Availabilities.get(0).getLocation()).isEqualTo(DiningLocation.COMMONS);
	}

	@Test
	public void testFindAllByUserId_WhenUserHasNoAvailabilities_ShouldReturnEmptyList() {
		// Create test user without availabilities
		UserEntity user = UserEntity.builder()
				.firstName("Alice")
				.lastName("Johnson")
				.email("alice@example.com")
				.build();

		entityManager.persist(user);
		entityManager.flush();

		// Test repository method
		List<AvailabilityEntity> userAvailabilities = availabilityRepository.findAllByUserId(user.getId());

		// Assertions
		assertThat(userAvailabilities).isEmpty();
	}
}