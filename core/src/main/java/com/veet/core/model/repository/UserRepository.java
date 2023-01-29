package com.veet.core.model.repository;

import com.veet.core.model.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, String>, JpaRepository<User, String> {

  @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = 'SUPER_ADMIN'")
  Optional<User> findSuperAdmin();

  Optional<User> findByUsername(String username);

  Optional<User> findByVerificationToken(String token);

  Optional<User> findByEmail(String email);

  Optional<User> findByPasswordResetToken(String token);
}
