package com.sp25group8.swipe4mebackend.users;

import com.sp25group8.swipe4mebackend.users.models.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, Long> {
}
