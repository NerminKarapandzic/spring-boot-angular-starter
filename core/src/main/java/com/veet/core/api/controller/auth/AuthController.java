package com.veet.core.api.controller.auth;

import com.veet.core.api.dto.request.CreateUserRequest;
import com.veet.core.api.dto.request.LoginRequest;
import com.veet.core.api.dto.request.PasswordResetRequest;
import com.veet.core.api.dto.response.TokenResponse;
import com.veet.core.api.dto.response.UserResponse;
import com.veet.core.api.service.auth.AuthService;
import com.veet.core.model.entity.User;
import com.veet.core.security.tokens.JwtAuthenticationToken;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<TokenResponse> authenticate(@RequestBody LoginRequest request) {
    var res = authService.authenticate(request);
    return ResponseEntity.ok(res);
  }

  @PostMapping("/refresh")
  public ResponseEntity<TokenResponse> refresh() {
    return ResponseEntity.ok().build();
  }

  @GetMapping("/me")
  public ResponseEntity<UserResponse> me(JwtAuthenticationToken authentication) {
    var response = new UserResponse(authentication.getUser());
    return ResponseEntity.ok(response);
  }

  @GetMapping("/request-verification/{email}")
  public ResponseEntity<Void> requestVerification(@PathVariable String email) {
    authService.requestVerification(email);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/verify/{token}")
  public ResponseEntity<TokenResponse> verify(@PathVariable String token) {
    var response = authService.verify(token);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/request-password-reset/{email}")
  public ResponseEntity<Void> requestPasswordReset(@PathVariable String email) {
    authService.requestPasswordReset(email);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/reset-password/{token}")
  public ResponseEntity<Void> resetPassword(@PathVariable String token, @RequestBody PasswordResetRequest request) {
    authService.updatePassword(token, request);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/register")
  public ResponseEntity<UserResponse> register(@RequestBody CreateUserRequest user) {
    var res = authService.register(user);
    return ResponseEntity.ok(res);
  }
}
