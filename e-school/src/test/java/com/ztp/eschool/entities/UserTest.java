package com.ztp.eschool.entities;

import com.ztp.eschool.enums.Role;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void shouldEncodePassword() {
        String password = "FakePass";

        User user = User.builder()
                .username("FakeUser")
                .password(password)
                .firstName("Morgan")
                .lastName("Freeman")
                .role(Role.STUDENT)
                .build();

        assertTrue(User.PASSWORD_ENCODER.matches(password, user.getPassword()));
    }
}