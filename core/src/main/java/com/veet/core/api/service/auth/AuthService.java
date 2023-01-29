package com.veet.core.api.service.auth;

import com.veet.core.api.dto.request.CreateUserRequest;
import com.veet.core.api.dto.request.LoginRequest;
import com.veet.core.api.dto.request.PasswordResetRequest;
import com.veet.core.api.dto.response.TokenResponse;
import com.veet.core.api.dto.response.UserResponse;
import com.veet.core.api.service.mail.EmailTemplates;
import com.veet.core.api.service.mail.SendinblueService;
import com.veet.core.exception.AppException;
import com.veet.core.exception.ErrorMessage;
import com.veet.core.model.entity.User;
import com.veet.core.model.repository.UserRepository;
import com.veet.core.security.service.TokenService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sendinblue.ApiException;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final EmailTemplates emailTemplates;
  private final TokenService tokenService;
  private final SendinblueService sendinblueService;

  public TokenResponse authenticate(LoginRequest loginRequest) {
    var user = userRepository.findByEmail(loginRequest.getEmail())
        .orElseThrow(() -> new AppException(ErrorMessage.UNAUTHORIZED, 401));

    if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
      throw new AppException(ErrorMessage.UNAUTHORIZED, 401);
    }

    var token = tokenService.generateToken(user);

    return new TokenResponse(token, null, new UserResponse(user));
  }

  public TokenResponse verify(String token) {
    var user = userRepository.findByVerificationToken(token)
        .orElseThrow(() -> new AppException(ErrorMessage.UNAUTHORIZED, 401));
    user.setVerified(true);
    userRepository.save(user);
    log.info("User verified: {}", user.getUsername());
    return new TokenResponse(tokenService.generateToken(user));
  }

  public void requestVerification(String email) {
    var user = userRepository.findByEmail(email)
        .orElseThrow(() -> new AppException(ErrorMessage.USER_NOT_FOUND, 404));

    try {
      sendinblueService.sendEmail(user.getEmail(),
          "nermin_biz@hotmail.com",
          "Verify your account",
          emailTemplates.getAccountVerificationTemplate(user.getVerificationToken()));
    } catch (ApiException e) {
      throw new AppException(ErrorMessage.FAILED_TO_SEND_EMAIL, 400);
    }
  }

  public void requestPasswordReset(String email) {
    var user = userRepository.findByEmail(email)
        .orElseThrow(() -> new AppException(ErrorMessage.USER_NOT_FOUND, 404));
    user.setPasswordResetToken(UUID.randomUUID().toString());
    userRepository.save(user);

    try {
      sendinblueService.sendEmail(user.getEmail(),
          "nermin_biz@hotmail.com",
          "Reset your password",
          emailTemplates.getPasswordResetTemplate(user.getVerificationToken()));
    } catch (ApiException e) {
      throw new AppException(ErrorMessage.FAILED_TO_SEND_EMAIL, 400);
    }
  }

  public void updatePassword(String token, PasswordResetRequest request) {
    var user = userRepository.findByPasswordResetToken(token)
        .orElseThrow(() -> new AppException(ErrorMessage.USER_NOT_FOUND, 404));

    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setPasswordResetToken(null);
    userRepository.save(user);
  }

  public UserResponse register(CreateUserRequest request) {
    var user = new User(request);
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    var savedUser = userRepository.save(user);

    try {
      sendAccountVerificationToken(savedUser);
    }catch (ApiException e) {
      log.error("Failed to send account verification to a new user, email:", e);
    }

    return new UserResponse(savedUser);
  }

  private boolean sendPasswordResetToken(User user) throws ApiException {
    sendinblueService.sendEmail(user.getEmail(),
        "nermin_biz@hotmail.com",
        "Reset your password",
        emailTemplates.getPasswordResetTemplate(user.getVerificationToken()));
    return true;
  }

  private boolean sendAccountVerificationToken(User user) throws ApiException {
    sendinblueService.sendEmail(user.getEmail(),
        "nermin_biz@hotmail.com",
        "Verify your account",
        emailTemplates.getAccountVerificationTemplate(user.getVerificationToken()));
    return true;
  }
}
