package com.ztp.eschool.repositories;

import com.ztp.eschool.entities.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<Student, Long> {
}
