package com.sp25group8.swipe4mebackend.users;

import com.sp25group8.swipe4mebackend.users.models.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserEntity createUser(String firstName, String lastName, String email, String phoneNumber, boolean isBuyer) {
        UserEntity user = new UserEntity(null, firstName, lastName, email, phoneNumber, isBuyer, null);
        return userRepository.save(user);
    }

}
