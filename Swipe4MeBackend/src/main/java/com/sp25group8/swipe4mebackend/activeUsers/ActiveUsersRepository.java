package com.sp25group8.swipe4mebackend.activeUsers;

import com.sp25group8.swipe4mebackend.models.activeUsers.ActiveUserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActiveUsersRepository extends CrudRepository<ActiveUserEntity, Long> {

    List<ActiveUserEntity> findAll();

}
