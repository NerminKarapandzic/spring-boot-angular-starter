package com.veet.core.api.service.mail;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EmailTemplates {

  @Value("${app.client.baseURL}") String baseURL;

  public String getAccountVerificationTemplate(String token) {
    var verifyUrl = baseURL + "/auth/verify/" + token;
    return String.format("<html><body><h1>Account Verification</h1><p>Click <a href=\"%s\">here</a> to verify your account.</p></body></html>"
        , verifyUrl);
  }

  public String getPasswordResetTemplate(String verificationToken) {
    var resetUrl = baseURL + "/auth/reset-password/" + verificationToken;
    return String.format("<html><body><h1>Password Reset</h1><p>Click <a href=\"%s\">here</a> to reset your password.</p></body></html>"
        , resetUrl);
  }
}
