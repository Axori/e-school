package com.ztp.eschool.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroupClass {
    private @Id
    @GeneratedValue
    Long id;

    private String name;

    @OneToMany(mappedBy = "groupClass")
    private List<Student> students;

    @OneToMany(mappedBy = "groupClass")
    private List<Subject> subjects;

    @OneToOne
    private Teacher teacher;
}