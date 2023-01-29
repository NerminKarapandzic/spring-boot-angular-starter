package com.veet.core.model.entity;

import static com.veet.core.exception.ConstraintName.USER_EMAIL_UNIQUE;
import static com.veet.core.exception.ConstraintName.USER_USERNAME_UNIQUE;

import com.veet.core.api.dto.request.CreateUserRequest;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users",
  uniqueConstraints = {
        @UniqueConstraint(columnNames = "username", name = USER_USERNAME_UNIQUE),
        @UniqueConstraint(columnNames = "email", name = USER_EMAIL_UNIQUE)
    })
@NoArgsConstructor
public class User {

  @Id
  private String id = UUID.randomUUID().toString();
  private String username;
  private String password;
  private String email;
  private Boolean verified = false;
  private String verificationToken = UUID.randomUUID().toString();
  private String passwordResetToken;
  @OneToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "user_role",
      joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "role_name", referencedColumnName = "name"))
  private List<Role> roles;

  public User(CreateUserRequest userRequest) {
    this.username = userRequest.getUsername();
    this.email = userRequest.getEmail();
  }
}
