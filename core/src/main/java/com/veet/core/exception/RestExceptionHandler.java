package com.veet.core.exception;

import java.util.HashMap;
import java.util.Map;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(AppException.class)
  public ResponseEntity<ErrorResponse> handleAppException(AppException ex) {
    return ResponseEntity.status(ex.getStatus()).body(new ErrorResponse(ex.getMessage(), ex.getStatus(), ex.getErrors()));
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
    String constraintName = null;
    String key = null;
    if ((ex.getCause() != null) && (ex.getCause() instanceof ConstraintViolationException)) {
      constraintName = ((ConstraintViolationException) ex.getCause()).getConstraintName();
    }

    key = ConstraintMsgKeyMappingResolver.resolve(constraintName);
    Map<String,String> errors = new HashMap<>();
    if (constraintName != null && key != null) {
      errors.put(key, constraintName);
    }

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(new ErrorResponse(ErrorMessage.CONSTRAINT_VIOLATION.toString(), HttpStatus.UNPROCESSABLE_ENTITY.value(), errors));
  }

  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
      HttpHeaders headers, HttpStatus status, WebRequest request) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getAllErrors().forEach((error) -> {
      String fieldName = ((FieldError) error).getField();
      String errorMessage = error.getDefaultMessage();
      errors.put(fieldName, errorMessage);
    });

    ErrorResponse response = new ErrorResponse("Validation failed", HttpStatus.UNPROCESSABLE_ENTITY.value(), errors);

    return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
