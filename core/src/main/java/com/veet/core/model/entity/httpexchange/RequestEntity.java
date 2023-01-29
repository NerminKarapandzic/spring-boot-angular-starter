package com.veet.core.model.entity.httpexchange;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.net.URI;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.boot.actuate.web.exchanges.HttpExchange.Request;

@Entity
@Getter
@NoArgsConstructor
public class RequestEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String uri;
  private String method;
  private String remoteAddress;

  public RequestEntity(Request request) {
    this.uri = request.getUri().getPath();
    this.method = request.getMethod();
    this.remoteAddress = request.getRemoteAddress();
  }

  public Request toRequest(RequestEntity request) {
    return new Request(URI.create(request.getUri()), request.getRemoteAddress(), request.getMethod(), null);
  }
}
