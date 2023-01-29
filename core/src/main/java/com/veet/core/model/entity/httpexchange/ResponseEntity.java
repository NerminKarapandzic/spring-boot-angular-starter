package com.veet.core.model.entity.httpexchange;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.boot.actuate.web.exchanges.HttpExchange.Response;

@Entity
@NoArgsConstructor
@Getter
public class ResponseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private int status;

  public ResponseEntity(Response response) {
    this.status = response.getStatus();
  }

  public Response toResponse(ResponseEntity response) {
    return new Response(response.getStatus(), null);
  }
}
