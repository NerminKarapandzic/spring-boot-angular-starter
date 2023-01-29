package com.veet.core.exception;

import static com.veet.core.exception.ConstraintName.USER_EMAIL_UNIQUE;
import static com.veet.core.exception.ConstraintName.USER_USERNAME_UNIQUE;

import java.util.Map;

public class ConstraintMsgKeyMappingResolver {

  public static Map<String, String> CONSTRAINT_MSG_KEY_MAPPING = Map.of(
      USER_EMAIL_UNIQUE, "email",
      USER_USERNAME_UNIQUE, "username"
  );

  public static String resolve(String constraintName) {
    return CONSTRAINT_MSG_KEY_MAPPING.get(constraintName);
  }
}
