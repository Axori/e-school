package com.ztp.eschool.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Mark {
    private @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    private Student student;

    private int value;
}