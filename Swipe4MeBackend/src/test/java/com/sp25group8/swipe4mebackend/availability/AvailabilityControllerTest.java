package com.sp25group8.swipe4mebackend.availability;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityDto;
import com.sp25group8.swipe4mebackend.models.enums.DiningLocation;
import com.sp25group8.swipe4mebackend.models.users.UserDto;
import com.sp25group8.swipe4mebackend.security.JwtAuthenticationFilter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false) // Disable security filters for testing
public class AvailabilityControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private AvailabilityService availabilityService;

	@MockBean
	private JwtAuthenticationFilter jwtAuthenticationFilter;

	@Test
	public void testGetAllAvailabilities_ShouldReturnAvailabilitiesList() throws Exception {
		// Prepare test data
		LocalDateTime now = LocalDateTime.now();
		List<AvailabilityDto> availabilities = Arrays.asList(
				new AvailabilityDto(
						1L,
						new UserDto(1L, "John", "Doe", "john@example.com", null, null, null),
						DiningLocation.COMMONS,
						now,
						now.plusHours(2)),
				new AvailabilityDto(
						2L,
						new UserDto(2L, "Jane", "Smith", "jane@example.com", null, null, null),
						DiningLocation.RAND,
						now.plusDays(1),
						now.plusDays(1).plusHours(3)));

		when(availabilityService.getAvailabilities()).thenReturn(availabilities);

		// Perform the request and verify
		mockMvc.perform(get("/availabilities"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$", hasSize(2)))
				.andExpect(jsonPath("$[0].id", is(1)))
				.andExpect(jsonPath("$[0].user.firstName", is("John")))
				.andExpect(jsonPath("$[0].location", is("COMMONS")))
				.andExpect(jsonPath("$[1].id", is(2)))
				.andExpect(jsonPath("$[1].user.firstName", is("Jane")))
				.andExpect(jsonPath("$[1].location", is("RAND")));

		verify(availabilityService).getAvailabilities();
	}

	@Test
	public void testGetAvailabilitiesByUserId_ShouldReturnUserAvailabilities() throws Exception {
		// Prepare test data
		Long userId = 1L;
		LocalDateTime now = LocalDateTime.now();
		List<AvailabilityDto> userAvailabilities = Arrays.asList(
				new AvailabilityDto(
						1L,
						new UserDto(userId, "John", "Doe", "john@example.com", null, null, null),
						DiningLocation.COMMONS,
						now,
						now.plusHours(2)),
				new AvailabilityDto(
						2L,
						new UserDto(userId, "John", "Doe", "john@example.com", null, null, null),
						DiningLocation.RAND,
						now.plusDays(1),
						now.plusDays(1).plusHours(3)));

		when(availabilityService.getAvailabilitiesByUserId(userId)).thenReturn(userAvailabilities);

		// Perform the request and verify
		mockMvc.perform(get("/availabilities/user/{userId}", userId))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$", hasSize(2)))
				.andExpect(jsonPath("$[0].id", is(1)))
				.andExpect(jsonPath("$[0].user.id", is(1)))
				.andExpect(jsonPath("$[0].location", is("COMMONS")))
				.andExpect(jsonPath("$[1].id", is(2)))
				.andExpect(jsonPath("$[1].location", is("RAND")));

		verify(availabilityService).getAvailabilitiesByUserId(userId);
	}

	@Test
	public void testGetAvailabilitiesByUserId_WhenNoAvailabilities_ShouldReturnEmptyList() throws Exception {
		// Setup
		Long userId = 999L;
		when(availabilityService.getAvailabilitiesByUserId(userId)).thenReturn(Collections.emptyList());

		// Perform the request and verify
		mockMvc.perform(get("/availabilities/user/{userId}", userId))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$", hasSize(0)));

		verify(availabilityService).getAvailabilitiesByUserId(userId);
	}

	@Test
	public void testAddAvailability_ShouldCreateAndReturnAvailability() throws Exception {
		// Setup test data
		Long userId = 1L;
		DiningLocation location = DiningLocation.COMMONS;
		LocalDateTime startTime = LocalDateTime.now();
		LocalDateTime endTime = startTime.plusHours(2);

		AvailabilityDto createdAvailability = new AvailabilityDto(
				1L,
				new UserDto(userId, "John", "Doe", "john@example.com", null, null, null),
				location,
				startTime,
				endTime);

		when(availabilityService.createAvailability(
				eq(userId),
				eq(location),
				any(),
				any()))
				.thenReturn(createdAvailability);

		// Perform the request and verify
		String startTimeStr = startTime.format(DateTimeFormatter.ISO_DATE_TIME);
		String endTimeStr = endTime.format(DateTimeFormatter.ISO_DATE_TIME);

		mockMvc.perform(post("/availabilities")
				.param("userId", userId.toString())
				.param("location", location.toString())
				.param("startTime", startTimeStr)
				.param("endTime", endTimeStr)
				.contentType(MediaType.APPLICATION_FORM_URLENCODED))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.id", is(1)))
				.andExpect(jsonPath("$.user.id", is(1)))
				.andExpect(jsonPath("$.location", is("COMMONS")));

		verify(availabilityService).createAvailability(
				eq(userId),
				eq(location),
				any(),
				any());
	}

	@Test
	public void testRemoveAvailability_ShouldDeleteAndReturnNoContent() throws Exception {
		// Setup
		Long availabilityId = 1L;

		// Perform the request and verify
		mockMvc.perform(delete("/availabilities/{availabilityId}", availabilityId))
				.andExpect(status().isOk());

		// Verify that the service method was called
		verify(availabilityService).removeAvailability(availabilityId);
	}
}