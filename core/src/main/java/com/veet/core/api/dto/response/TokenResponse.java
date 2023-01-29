package com.veet.core.api.dto.response;

import lombok.Data;

@Data
public class TokenResponse {

  private String token;
  private String refreshToken;
  private UserResponse user;

  public TokenResponse(String token) {
    this.token = token;
  }

  public TokenResponse(String token, String refreshToken, UserResponse user) {
    this.token = token;
    this.refreshToken = refreshToken;
    this.user = user;
  }
}
