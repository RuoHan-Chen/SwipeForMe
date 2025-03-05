package com.sp25group8.swipe4mebackend;

import com.sp25group8.swipe4mebackend.models.dtos.UserDto;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import com.sp25group8.swipe4mebackend.users.UserRepository;
import com.sp25group8.swipe4mebackend.users.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void testCreateUser() {
        UserEntity user = new UserEntity(
                null,
                "John",
                "Doe",
                "jd@gmail.com",
                "123",
                null,
                "abc.com"
        );

        given(userRepository.save(user)).willReturn(user);
        UserEntity savedUser = userService.createUser(
                user.firstName(),
                user.lastName(),
                user.email(),
                user.phoneNumber(),
                user.ProfilePicUrl()
        );

        assertThat(savedUser).isEqualTo(user);
    }

    @Test
    public void testGetCurrentUser() {
        UserEntity user = new UserEntity(
                null,
                "John",
                "Doe",
                "jd@gmail.com",
                "123",
                null,
                "abc.com"
        );

        // Login user
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities()));

        UserDto curUserDto = userService.getCurrentUser();
        assertThat(curUserDto).isNotNull();
        assertThat(curUserDto).isEqualTo(UserDto.fromEntity(user));
    }

}
