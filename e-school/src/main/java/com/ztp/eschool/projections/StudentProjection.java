package com.ztp.eschool.projections;

import com.ztp.eschool.entities.Student;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "StudentProjection", types = Student.class)
public interface StudentProjection {

    @Value("#{target.user.toString()}")
    String getName();
}
