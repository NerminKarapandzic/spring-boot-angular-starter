package com.veet.core.security.providers;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.veet.core.model.entity.Role;
import com.veet.core.model.entity.User;
import com.veet.core.security.service.TokenService;
import com.veet.core.security.tokens.JwtAuthenticationToken;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtTokenAuthenticationProvider implements AuthenticationProvider {

  private final TokenService tokenService;

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    JwtAuthenticationToken authenticationToken = (JwtAuthenticationToken) authentication;

    try{
      DecodedJWT decodedJWT = tokenService.validateToken(authenticationToken.getToken());
      var roles = decodedJWT.getClaim("roles").asList(String.class);
      User user = new User();
      user.setId(decodedJWT.getClaim("userId").asString());
      user.setRoles(roles.stream().map(Role::new).toList());
      return new JwtAuthenticationToken(user, true);
    }catch (Exception e){
      return authenticationToken;
    }
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return authentication.equals(JwtAuthenticationToken.class);
  }
}
