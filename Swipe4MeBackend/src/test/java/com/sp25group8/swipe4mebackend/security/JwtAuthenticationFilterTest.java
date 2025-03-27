package com.sp25group8.swipe4mebackend.security;

import com.sp25group8.swipe4mebackend.models.users.UserEntity;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class JwtAuthenticationFilterTest {

    @Mock
    private HandlerExceptionResolver handlerExceptionResolver;

    @Mock
    private JwtService jwtService;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private UserDetails userDetails;

    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private static final String TEST_TOKEN = "valid.jwt.token";
    private static final String TEST_EMAIL = "user@example.com";

    @BeforeEach
    void setUp() {
        jwtAuthenticationFilter = new JwtAuthenticationFilter(
                handlerExceptionResolver,
                jwtService,
                userDetailsService);
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void doFilterInternal_WithValidToken_ShouldAuthenticateUser() throws ServletException, IOException {
        // Given
        when(request.getHeader("Authorization")).thenReturn("Bearer " + TEST_TOKEN);
        when(jwtService.extractUsername(TEST_TOKEN)).thenReturn(TEST_EMAIL);
        when(securityContext.getAuthentication()).thenReturn(null);
        when(userDetailsService.loadUserByUsername(TEST_EMAIL)).thenReturn(userDetails);
        when(jwtService.isTokenValid(TEST_TOKEN, userDetails)).thenReturn(true);

        // When
        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        // Then
        ArgumentCaptor<Authentication> authCaptor = ArgumentCaptor.forClass(Authentication.class);
        verify(securityContext).setAuthentication(authCaptor.capture());
        UsernamePasswordAuthenticationToken capturedAuth = (UsernamePasswordAuthenticationToken) authCaptor.getValue();

        assertThat(capturedAuth.getPrincipal()).isEqualTo(userDetails);
        assertThat(capturedAuth.getCredentials()).isNull();
        assertThat(capturedAuth.getDetails()).isEqualTo(userDetails);

        verify(filterChain).doFilter(request, response);
        verify(jwtService).extractUsername(TEST_TOKEN);
        verify(userDetailsService).loadUserByUsername(TEST_EMAIL);
        verify(jwtService).isTokenValid(TEST_TOKEN, userDetails);
    }

    @Test
    void doFilterInternal_WithNoAuthHeader_ShouldContinueFilterChain() throws ServletException, IOException {
        // Given
        when(request.getHeader("Authorization")).thenReturn(null);

        // When
        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        // Then
        verify(filterChain).doFilter(request, response);
        verifyNoInteractions(jwtService);
        verifyNoInteractions(userDetailsService);
        verifyNoInteractions(securityContext);
    }

    @Test
    void doFilterInternal_WithNonBearerToken_ShouldContinueFilterChain() throws ServletException, IOException {
        // Given
        when(request.getHeader("Authorization")).thenReturn("Basic dXNlcjpwYXNzd29yZA==");

        // When
        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        // Then
        verify(filterChain).doFilter(request, response);
        verifyNoInteractions(jwtService);
        verifyNoInteractions(userDetailsService);
        verifyNoInteractions(securityContext);
    }

    @Test
    void doFilterInternal_WithInvalidToken_ShouldNotAuthenticate() throws ServletException, IOException {
        // Given
        when(request.getHeader("Authorization")).thenReturn("Bearer " + TEST_TOKEN);
        when(jwtService.extractUsername(TEST_TOKEN)).thenReturn(TEST_EMAIL);
        when(securityContext.getAuthentication()).thenReturn(null);
        when(userDetailsService.loadUserByUsername(TEST_EMAIL)).thenReturn(userDetails);
        when(jwtService.isTokenValid(TEST_TOKEN, userDetails)).thenReturn(false);

        // When
        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        // Then
        verify(filterChain).doFilter(request, response);
        verify(securityContext, never()).setAuthentication(any());
    }

    @Test
    void doFilterInternal_WithNullEmail_ShouldNotAuthenticate() throws ServletException, IOException {
        // Given
        when(request.getHeader("Authorization")).thenReturn("Bearer " + TEST_TOKEN);
        when(jwtService.extractUsername(TEST_TOKEN)).thenReturn(null);

        // When
        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        // Then
        verify(filterChain).doFilter(request, response);
        verifyNoInteractions(userDetailsService);
        verify(securityContext, never()).setAuthentication(any());
    }

    @Test
    void doFilterInternal_WithExistingAuthentication_ShouldSkipAuthentication() throws ServletException, IOException {
        // Given
        when(request.getHeader("Authorization")).thenReturn("Bearer " + TEST_TOKEN);
        when(jwtService.extractUsername(TEST_TOKEN)).thenReturn(TEST_EMAIL);

        // Mock existing authentication
        Authentication existingAuth = new UsernamePasswordAuthenticationToken(
                "existing_user", null, Collections.emptyList());
        when(securityContext.getAuthentication()).thenReturn(existingAuth);

        // When
        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        // Then
        verify(filterChain).doFilter(request, response);
        verifyNoInteractions(userDetailsService);
        // No new authentication should be set
        verify(securityContext, never()).setAuthentication(any());
    }

    @Test
    void doFilterInternal_WithUserNotFoundException_ShouldHandleException() throws ServletException, IOException {
        // Given
        RuntimeException exception = new RuntimeException("User not found");

        when(request.getHeader("Authorization")).thenReturn("Bearer " + TEST_TOKEN);
        when(jwtService.extractUsername(TEST_TOKEN)).thenReturn(TEST_EMAIL);
        when(securityContext.getAuthentication()).thenReturn(null);
        when(userDetailsService.loadUserByUsername(TEST_EMAIL)).thenThrow(exception);

        // When
        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        // Then
        // Filter chain should NOT be called because an exception occurred and was
        // handled
        verify(filterChain, never()).doFilter(request, response);

        // Exception should be handled by the resolver
        verify(handlerExceptionResolver).resolveException(
                eq(request),
                eq(response),
                eq(null),
                eq(exception));
    }
}