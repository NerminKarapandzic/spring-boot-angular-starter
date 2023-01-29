package com.veet.core.api.dto.response;

import com.veet.core.model.entity.Role;
import com.veet.core.model.entity.User;
import java.util.List;
import lombok.Data;

@Data
public class UserResponse {

  private String id;
  private String username;
  private String email;
  private Boolean verified;
  private List<String> roles;


  public UserResponse(User user) {
    this.id = user.getId();
    this.username = user.getUsername();
    this.email = user.getEmail();
    this.verified = user.getVerified();
    if (user.getRoles() != null) {
      this.roles = user.getRoles().stream().map(Role::getName).toList();
    }
  }
}
