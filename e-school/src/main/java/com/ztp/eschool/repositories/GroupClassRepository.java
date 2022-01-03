package com.ztp.eschool.repositories;

import com.ztp.eschool.entities.GroupClass;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;

public interface GroupClassRepository extends CrudRepository<GroupClass, Long> {
    @RestResource(path = "teacherGroup")
    GroupClass findGroupClassByTeacherUserId(Long id);

    @RestResource(path = "studentGroup")
    GroupClass findGroupClassByStudents_User_Id(Long id);
}
