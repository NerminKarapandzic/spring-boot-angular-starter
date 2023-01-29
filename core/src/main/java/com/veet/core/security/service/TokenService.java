package com.veet.core.security.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.veet.core.model.entity.Role;
import com.veet.core.model.entity.User;
import com.auth0.jwt.interfaces.JWTVerifier;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
  Algorithm algorithm;
  @Value("${app.jwt.expiration.hours}") int expirationHours;
  @Value("${app.jwt.issuer") String issuer;

  public TokenService(@Value("${app.jwt.secret}") String jwtSecret) {
    algorithm = Algorithm.HMAC256(jwtSecret);
  }

  public String generateToken(User user){
    return JWT.create()
        .withSubject(user.getUsername())
        .withExpiresAt(new Date().toInstant().plus(expirationHours, ChronoUnit.HOURS))
        .withIssuer(issuer)
        .withClaim("roles", user.getRoles().stream().map(Role::getName).toList())
        .withClaim("userId", user.getId())
        .sign(algorithm);
  }

  public long getTokenExpiresIn(String token){
    var expiresAt = decodeToken(token).getExpiresAtAsInstant().toEpochMilli();
    return expiresAt - Instant.now().toEpochMilli();
  }

  public DecodedJWT decodeToken(String token){
    return JWT.decode(token);
  }

  public DecodedJWT validateToken(String token){
    JWTVerifier verifier = JWT.require(algorithm).build();
    return verifier.verify(token);
  }
}
