package com.ztp.eschool.repositories;

import com.ztp.eschool.entities.Student;
import com.ztp.eschool.projections.StudentProjection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = StudentProjection.class)
public interface StudentRepository extends CrudRepository<Student, Long> {
}
