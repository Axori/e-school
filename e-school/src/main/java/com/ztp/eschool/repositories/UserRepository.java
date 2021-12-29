package com.ztp.eschool.repositories;

import com.ztp.eschool.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);

    @Query("select u from User u where u.username = ?#{principal?.username}")
    User me();
}
