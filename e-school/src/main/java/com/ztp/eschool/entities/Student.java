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
public class Student {
    private @Id
    @GeneratedValue
    Long id;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    @ManyToOne
    private GroupClass groupClass;

    @OneToMany
    private List<Mark> marks;
}
