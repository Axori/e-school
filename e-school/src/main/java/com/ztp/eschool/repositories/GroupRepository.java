package com.ztp.eschool.repositories;

import com.ztp.eschool.entities.GroupClass;
import org.springframework.data.repository.CrudRepository;

public interface GroupRepository extends CrudRepository<GroupClass, Long> {
}
