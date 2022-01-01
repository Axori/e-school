package com.ztp.eschool.projections;

import com.ztp.eschool.entities.Teacher;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "TeacherProjection", types = Teacher.class)
public interface TeacherProjection {

    @Value("#{target.user.toString()}")
    String getName();
}
