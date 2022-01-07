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
public class Subject {
    private @Id
    @GeneratedValue
    Long id;

    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Mark> marks;

    @ManyToOne
    @JoinColumn(name = "groupClassId")
    private GroupClass groupClass;
}