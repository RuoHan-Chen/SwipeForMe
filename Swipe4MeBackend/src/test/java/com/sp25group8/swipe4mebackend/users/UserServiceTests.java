package com.sp25group8.swipe4mebackend.users;

import com.sp25group8.swipe4mebackend.models.users.UserDto;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
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
		UserEntity user = UserEntity.builder()
				.firstName("John")
				.lastName("Doe")
				.email("jd@gmail.com")
				.phoneNumber("123")
				.profilePicUrl("abc.com")
				.build();

		given(userRepository.save(user)).willReturn(user);
		UserEntity savedUser = userService.createUser(
				user.getFirstName(),
				user.getLastName(),
				user.getEmail(),
				user.getPhoneNumber(),
				user.getProfilePicUrl());

		assertThat(savedUser).isEqualTo(user);
	}

	@Test
	public void testGetCurrentUser() {
		UserEntity user = UserEntity.builder()
				.firstName("John")
				.lastName("Doe")
				.email("jd@gmail.com")
				.phoneNumber("123")
				.profilePicUrl("abc.com")
				.build();

		// Login user
		SecurityContextHolder.getContext()
				.setAuthentication(new UsernamePasswordAuthenticationToken(user, null,
						user.getAuthorities()));

		UserDto curUserDto = userService.getCurrentUser();
		assertThat(curUserDto).isNotNull();
		assertThat(curUserDto).isEqualTo(UserDto.fromEntity(user));
	}

}
