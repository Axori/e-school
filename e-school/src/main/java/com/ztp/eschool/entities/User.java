package com.ztp.eschool.entities;

import com.ztp.eschool.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private @Id
    @GeneratedValue
    Long id;
    private Role role;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
}
