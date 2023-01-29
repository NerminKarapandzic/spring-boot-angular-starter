package com.veet.core.exception;

import java.util.Map;
import lombok.Data;

@Data
public class ErrorResponse {

  private String message;
  private Integer status;
  private Map<String, String> errors;

  public ErrorResponse(String message, Integer status) {
    this.message = message;
    this.status = status;
  }

  public ErrorResponse(String message, Integer status, Map<String, String> errors) {
    this.message = message;
    this.status = status;
    this.errors = errors;
  }
}
