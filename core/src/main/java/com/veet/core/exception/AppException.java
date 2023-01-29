package com.veet.core.exception;

import java.util.Map;
import lombok.Getter;

@Getter
public class AppException extends RuntimeException{

  private String message;
  private Map<String, String> errors;
  private Integer status;

  public AppException(ErrorMessage message, Integer status) {
    this.message = message.toString();
    this.status = status;
  }

  public AppException(ErrorMessage message, Map<String, String> errors, Integer status) {
    this.message = message.toString();
    this.errors = errors;
    this.status = status;
  }
}
