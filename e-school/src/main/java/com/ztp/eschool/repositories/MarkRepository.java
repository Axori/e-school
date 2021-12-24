package com.ztp.eschool.repositories;

import com.ztp.eschool.entities.Subject;
import org.springframework.data.repository.CrudRepository;

public interface MarkRepository extends CrudRepository<Subject, Long> {
}
