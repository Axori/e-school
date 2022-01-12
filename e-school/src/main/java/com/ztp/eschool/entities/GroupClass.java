package com.ztp.eschool.entities;

import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE Group_Class SET deleted = true WHERE id=?")
@Where(clause = "deleted=false")
public class GroupClass {
    private @Id
    @GeneratedValue
    Long id;

    private String name;

    private boolean deleted = Boolean.FALSE;

    @OneToMany(mappedBy = "groupClass")
    private List<Student> students;

    @OneToMany(mappedBy = "groupClass")
    private List<Subject> subjects;

    @OneToOne
    private Teacher teacher;
}