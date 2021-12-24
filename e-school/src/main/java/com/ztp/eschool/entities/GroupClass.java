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
public class GroupClass {
    private @Id
    @GeneratedValue
    Long id;

    @OneToMany(mappedBy = "groupClass")
    private List<Student> students;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;
}