// Author: Steven Yi
// Time spent: 2 hours

package com.sp25group8.swipe4mebackend.models.users;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.sp25group8.swipe4mebackend.models.availabilities.AvailabilityEntity;
import com.sp25group8.swipe4mebackend.models.ratings.RatingEntity;
import com.sp25group8.swipe4mebackend.models.transactions.TransactionEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Entity
@Table("users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity implements UserDetails, OAuth2User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "first_name", nullable = false, length = 100)
	private String firstName;

	@Column(name = "last_name", nullable = false, length = 100)
	private String lastName;

	@Column(nullable = false, length = 100, unique = true)
	private String email;

	@Column(name = "phone_number", length = 50)
	private String phoneNumber;

	@Column
	private Double rating;

	@Column(name = "profile_pic_url")
	private String profilePicUrl;

	// Relationships
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<AvailabilityEntity> availabilities;

	@OneToMany(mappedBy = "buyer")
	private Set<TransactionEntity> transactionsAsBuyer;

	@OneToMany(mappedBy = "seller")
	private Set<TransactionEntity> transactionsAsSeller;

	@OneToMany(mappedBy = "buyer")
	private Set<RatingEntity> ratingsAsBuyer;

	@OneToMany(mappedBy = "seller")
	private Set<RatingEntity> ratingsAsSeller;

	@Override
	public Map<String, Object> getAttributes() {
		return Map.of();
	}

	// UserDetails implementation
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of();
	}

	@Override
	public String getPassword() {
		return "";
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public String getName() {
		return firstName + " " + lastName;
	}
}
