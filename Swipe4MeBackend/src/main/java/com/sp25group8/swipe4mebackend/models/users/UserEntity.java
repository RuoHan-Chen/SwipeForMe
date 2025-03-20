// Author: Steven Yi
// Time spent: 2 hours

package com.sp25group8.swipe4mebackend.models.users;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Table("users")
public record UserEntity(
        @Id
        Long id,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        Double rating,
        String ProfilePicUrl
) implements UserDetails, OAuth2User {
        @Override
        public Map<String, Object> getAttributes() {
                return Map.of();
        }

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
