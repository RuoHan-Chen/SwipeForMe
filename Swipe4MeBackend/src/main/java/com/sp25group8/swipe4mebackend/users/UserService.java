// Author: Steven Yi
// Time spent: 1 hour

package com.sp25group8.swipe4mebackend.users;

import com.sp25group8.swipe4mebackend.exceptions.UserNotFoundException;
import com.sp25group8.swipe4mebackend.models.dtos.UserDto;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserEntity createUser(String firstName, String lastName, String email, String phoneNumber,
            String profilePicUrl) {
        UserEntity user = UserEntity.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .phoneNumber(phoneNumber)
                .profilePicUrl(profilePicUrl)
                .build();
        return userRepository.save(user);
    }

    public UserDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserEntity userEntity = (UserEntity) authentication.getPrincipal();
        return UserDto.fromEntity(userEntity);
    }

    public UserDto getUserById(Long id) {
        UserEntity userEntity = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
        return UserDto.fromEntity(userEntity);
    }

}
