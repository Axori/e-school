package com.ztp.eschool.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Teacher {
    private @Id
    @GeneratedValue
    Long id;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    @OneToMany
    private List<GroupClass> groupClass;
}
