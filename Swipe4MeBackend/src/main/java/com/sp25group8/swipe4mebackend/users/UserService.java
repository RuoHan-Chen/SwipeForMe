package com.sp25group8.swipe4mebackend.users;

import com.sp25group8.swipe4mebackend.users.dtos.UserDto;
import com.sp25group8.swipe4mebackend.users.models.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserEntity createUser(String firstName, String lastName, String email, String phoneNumber) {
        UserEntity user = new UserEntity(null, firstName, lastName, email, phoneNumber, null);
        return userRepository.save(user);
    }

    public UserDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserEntity userEntity = (UserEntity) authentication.getPrincipal();
        return UserDto.fromEntity(userEntity);
    }

}
