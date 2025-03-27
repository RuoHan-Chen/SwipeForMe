package com.sp25group8.swipe4mebackend.config;

import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

/**
 * Base class for repository tests that configures H2 database and disables
 * Liquibase.
 * Extend this class to create repository tests with proper test configuration.
 * 
 * This class uses the 'test' profile which loads configuration from
 * application-test.yml
 * providing H2 database setup and other test-specific configurations.
 */
@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestPropertySource(properties = {
        "spring.liquibase.enabled=false",
        "spring.jpa.hibernate.ddl-auto=create-drop"
})
public abstract class BaseRepositoryTest {
    // Add common test utility methods here if needed
}