package com.sp25group8.swipe4mebackend.users;

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

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void testGetCurrentUser_ShouldReturnCurrentUser() throws Exception {
        // Given
        UserDto userDto = new UserDto(
                1L,
                "John",
                "Doe",
                "john@example.com",
                "123-456-7890",
                4.5,
                "https://example.com/profile.jpg");

        when(userService.getCurrentUser()).thenReturn(userDto);

        // When/Then
        mockMvc.perform(get("/users/me")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.email").value("john@example.com"))
                .andExpect(jsonPath("$.phoneNumber").value("123-456-7890"))
                .andExpect(jsonPath("$.rating").value(4.5))
                .andExpect(jsonPath("$.profilePicUrl").value("https://example.com/profile.jpg"));
    }

    @Test
    void testGetCurrentUser_ShouldHandleNullValues() throws Exception {
        // Given
        UserDto userDto = new UserDto(
                1L,
                "John",
                "Doe",
                "john@example.com",
                null, // phoneNumber is null
                null, // rating is null
                null // profilePicUrl is null
        );

        when(userService.getCurrentUser()).thenReturn(userDto);

        // When/Then
        mockMvc.perform(get("/users/me")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.email").value("john@example.com"))
                .andExpect(jsonPath("$.phoneNumber").doesNotExist())
                .andExpect(jsonPath("$.rating").doesNotExist())
                .andExpect(jsonPath("$.profilePicUrl").doesNotExist());
    }
}