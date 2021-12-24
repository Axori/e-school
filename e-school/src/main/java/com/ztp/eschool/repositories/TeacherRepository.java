package com.ztp.eschool.repositories;

import com.ztp.eschool.entities.Teacher;
import org.springframework.data.repository.CrudRepository;

public interface TeacherRepository extends CrudRepository<Teacher, Long> {
}
