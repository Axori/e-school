package com.ztp.eschool.entities;

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
public class Mark {
    private @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Subject subject;

    private int value;
}