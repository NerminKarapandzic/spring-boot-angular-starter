package com.veet.core.security.tokens;

import com.veet.core.model.entity.User;
import java.util.Collection;
import lombok.Getter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Getter
public class JwtAuthenticationToken implements Authentication {

  private String token;
  private User user;
  private Boolean isAuthenticated = false;

  public JwtAuthenticationToken(String token) {
    this.token = token;
  }

  public JwtAuthenticationToken(
      User user, Boolean isAuthenticated) {
    this.user = user;
    this.isAuthenticated = isAuthenticated;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return user.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority("ROLE_"+ role.getName()))
        .toList();
  }

  @Override
  public Object getCredentials() {
    return null;
  }

  @Override
  public Object getDetails() {
    return user;
  }

  @Override
  public Object getPrincipal() {
    return user;
  }

  @Override
  public boolean isAuthenticated() {
    return isAuthenticated;
  }

  @Override
  public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
    this.isAuthenticated = isAuthenticated;
  }

  @Override
  public String getName() {
    return user.getUsername();
  }
}