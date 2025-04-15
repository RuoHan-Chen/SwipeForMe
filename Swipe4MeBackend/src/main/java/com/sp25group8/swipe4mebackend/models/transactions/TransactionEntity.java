// Authors: Jerry Wei, Steven Yi
// Time spent: 30 minutes

package com.sp25group8.swipe4mebackend.models.transactions;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;
import com.sp25group8.swipe4mebackend.models.users.UserEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
