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
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    private @Id
    @GeneratedValue
    Long id;
    private Role role;
    private String username;
    @JsonIgnore
    private String password;
    private String firstName;
    private String lastName;

    public User(String username, String password, String firstName, String lastName, Role role) {
        this.role = role;
        this.username = username;
        this.setPassword(password);
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    public static class UserBuilder {
        public UserBuilder password(String password) {
            this.password = PASSWORD_ENCODER.encode(password);
            return this;
        }
    }
}
