package com.sp25group8.swipe4mebackend.activeUsers;

import com.sp25group8.swipe4mebackend.models.activeUsers.ActiveUserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActiveUsersService {

    private final ActiveUsersRepository activeUsersRepository;

    public List<ActiveUserEntity> getActiveUsers() {
        return activeUsersRepository.findAll();
    }

}
