package com.sp25group8.swipe4mebackend.ratings;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class RatingControllerTest {

    private MockMvc mockMvc;

    @Mock
    private RatingService ratingService;

    @InjectMocks
    private RatingController ratingController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(ratingController).build();
    }

    @Test
    void getUserRating_WhenUserHasRatings_ShouldReturnAverageRating() throws Exception {
        // Given
        Long userId = 1L;
        Double averageRating = 4.5;

        when(ratingService.getUserRating(userId)).thenReturn(averageRating);

        // When/Then
        mockMvc.perform(get("/ratings")
                .param("userId", userId.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").value(4.5));
    }

    @Test
    void getUserRating_WhenUserHasNoRatings_ShouldReturnNegativeOne() throws Exception {
        // Given
        Long userId = 999L;
        Double noRatingValue = -1.0;

        when(ratingService.getUserRating(userId)).thenReturn(noRatingValue);

        // When/Then
        mockMvc.perform(get("/ratings")
                .param("userId", userId.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").value(-1.0));
    }

    @Test
    void getUserRating_WhenUserHasZeroRating_ShouldReturnZero() throws Exception {
        // Given
        Long userId = 2L;
        Double zeroRating = 0.0;

        when(ratingService.getUserRating(userId)).thenReturn(zeroRating);

        // When/Then
        mockMvc.perform(get("/ratings")
                .param("userId", userId.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").value(0.0));
    }

    @Test
    void getUserRating_WhenUserHasDecimalRating_ShouldReturnExactValue() throws Exception {
        // Given
        Long userId = 3L;
        Double decimalRating = 3.75;

        when(ratingService.getUserRating(userId)).thenReturn(decimalRating);

        // When/Then
        mockMvc.perform(get("/ratings")
                .param("userId", userId.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").value(3.75));
    }
}