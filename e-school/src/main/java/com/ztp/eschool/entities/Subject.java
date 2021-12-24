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
public class Subject {
    private @Id
    @GeneratedValue
    Long id;

    private String name;

    @OneToMany
    private List<Mark> marks;
}