// Author: Steven Yi
// Time spent: 30 minutes

package com.sp25group8.swipe4mebackend.availability;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;
import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityJoinResult;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvailabilityRepository extends CrudRepository<AvailabilityEntity, Long> {

    @Query("SELECT u.email, u.rating, u.first_name, u.last_name, a.id, a.user_id, a.location, a.start_time, a.end_time FROM public.users u JOIN public.availabilities a ON u.id = a.user_id")
    List<AvailabilityJoinResult> findAllAvailabilities();

}
