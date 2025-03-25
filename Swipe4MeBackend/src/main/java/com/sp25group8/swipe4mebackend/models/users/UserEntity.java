// Author: Steven Yi
// Time spent: 2 hours

package com.sp25group8.swipe4mebackend.models.users;

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
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
	@Builder.Default
	private Set<AvailabilityEntity> availabilities = new HashSet<>();

	@OneToMany(mappedBy = "buyer")
	@Builder.Default
	private Set<TransactionEntity> transactionsAsBuyer = new HashSet<>();

	@OneToMany(mappedBy = "seller")
	@Builder.Default
	private Set<TransactionEntity> transactionsAsSeller = new HashSet<>();

	@OneToMany(mappedBy = "buyer")
	@Builder.Default
	private Set<RatingEntity> ratingsAsBuyer = new HashSet<>();

	@OneToMany(mappedBy = "seller")
	@Builder.Default
	private Set<RatingEntity> ratingsAsSeller = new HashSet<>();

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
