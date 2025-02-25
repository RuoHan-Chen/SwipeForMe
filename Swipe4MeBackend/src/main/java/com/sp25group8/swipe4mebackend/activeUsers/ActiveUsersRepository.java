package com.sp25group8.swipe4mebackend.activeUsers;

import com.sp25group8.swipe4mebackend.models.activeUsers.ActiveUserEntity;
import com.sp25group8.swipe4mebackend.models.activeUsers.ActiveUserJoinResult;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActiveUsersRepository extends CrudRepository<ActiveUserEntity, Long> {

    @Query("SELECT u.email, u.rating, u.first_name, u.last_name, au.id, au.user_id, au.location, au.start_time, au.end_time FROM public.users u JOIN public.active_users au ON u.id = au.user_id")
    List<ActiveUserJoinResult> findAllActiveUsers();

}
