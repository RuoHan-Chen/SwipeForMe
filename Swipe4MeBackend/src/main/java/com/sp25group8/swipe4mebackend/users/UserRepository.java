// Author: Steven Yi
// Time spent: 30 minutes

package com.sp25group8.swipe4mebackend.users;

import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmail(String email);

}
