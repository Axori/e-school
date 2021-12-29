package com.ztp.eschool;

import com.ztp.eschool.entities.User;
import com.ztp.eschool.enums.Role;
import com.ztp.eschool.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Profile("dev")
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    public DatabaseLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        User wasdam = User.builder()
                .username("wasdam")
                .password("P@ssw0rd")
                .firstName("Damian")
                .lastName("Wasilenko")
                .role(Role.STUDENT)
                .build();
        User tabdaw = User.builder()
                .username("tabdaw")
                .password("P@ssw0rd")
                .firstName("Dawid")
                .lastName("Taborski")
                .role(Role.STUDENT)
                .build();
        userRepository.saveAll(Arrays.asList(tabdaw, wasdam));
    }
}
