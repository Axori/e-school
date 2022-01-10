package com.ztp.eschool.repositories;

import com.ztp.eschool.entities.GroupClass;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

public interface GroupClassRepository extends CrudRepository<GroupClass, Long> {
    @RestResource(path = "teacherGroup")
    List<GroupClass> findGroupClassByTeacherUserId(Long id);

    @RestResource(path = "studentGroup")
    GroupClass findGroupClassByStudents_User_Id(Long id);
}
