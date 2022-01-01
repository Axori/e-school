package com.ztp.eschool.repositories;

import com.ztp.eschool.entities.Mark;
import com.ztp.eschool.projections.MarkProjection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = MarkProjection.class)
public interface MarkRepository extends CrudRepository<Mark, Long> {
}
