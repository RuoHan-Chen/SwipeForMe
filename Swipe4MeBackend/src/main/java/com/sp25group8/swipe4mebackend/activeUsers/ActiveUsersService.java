package com.sp25group8.swipe4mebackend.activeUsers;

import com.sp25group8.swipe4mebackend.models.activeUsers.ActiveUserEntity;
import com.sp25group8.swipe4mebackend.models.activeUsers.ActiveUserJoinResult;
import com.sp25group8.swipe4mebackend.models.enums.DiningHall;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ActiveUsersService {

    private final ActiveUsersRepository activeUsersRepository;

    public List<ActiveUserJoinResult> getActiveUsers() {
        return activeUsersRepository.findAllActiveUsers();
    }

    public ActiveUserEntity createActiveUser(
            Long userId,
            DiningHall location,
            LocalDateTime startTime,
            LocalDateTime endTime
    ) {
        ActiveUserEntity activeUserEntity = new ActiveUserEntity(null, userId, location, startTime, endTime);
        return activeUsersRepository.save(activeUserEntity);
    }

    public void removeActiveUser(Long userId) {
        activeUsersRepository.deleteById(userId);
    }
}
