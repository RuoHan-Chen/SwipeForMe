// Authors: Jerry Wei, Steven Yi
// Time spent: 30 minutes

package com.sp25group8.swipe4mebackend.models.transactions;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

import jakarta.persistence.*;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "availability_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private AvailabilityEntity availability;

	@ManyToOne
	@JoinColumn(name = "buyer_id", nullable = false)
	private UserEntity buyer;

	@ManyToOne
	@JoinColumn(name = "seller_id", nullable = false)
	private UserEntity seller;

	@Enumerated(EnumType.STRING)
	@Column(name = "status", nullable = false)
	private TransactionStatus status;
}
