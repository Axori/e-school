package com.ztp.eschool.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ztp.eschool.enums.Role;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
public class User {
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    private @Id
    @GeneratedValue
    Long id;
    private String username;
    @JsonIgnore
    private String password;
    private String firstName;
    private String lastName;
    private Role role;

    public User(Long id, String username, String password, String firstName, String lastName, Role role) {
        this.id = id;
        this.role = role;
        this.username = username;
        this.setPassword(password);
        this.firstName = firstName;
        this.lastName = lastName;
    }

    protected User() {

    }

    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }
}
