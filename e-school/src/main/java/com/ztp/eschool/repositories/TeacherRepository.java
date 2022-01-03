package com.ztp.eschool.repositories;

import com.ztp.eschool.entities.Teacher;
import com.ztp.eschool.projections.TeacherProjection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = TeacherProjection.class)
public interface TeacherRepository extends CrudRepository<Teacher, Long> {
}
