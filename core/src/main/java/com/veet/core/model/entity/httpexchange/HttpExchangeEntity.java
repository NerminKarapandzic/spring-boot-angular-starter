package com.veet.core.model.entity.httpexchange;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.springframework.boot.actuate.web.exchanges.HttpExchange;

@Entity
@NoArgsConstructor
@Getter
public class HttpExchangeEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private Instant timestamp;
  @OneToOne(fetch = FetchType.EAGER)
  @Cascade(org.hibernate.annotations.CascadeType.ALL)
  private RequestEntity request;
  @OneToOne(fetch = FetchType.EAGER)
  @Cascade(org.hibernate.annotations.CascadeType.ALL)
  private ResponseEntity response;
  @OneToOne(fetch = FetchType.EAGER)
  @Cascade(org.hibernate.annotations.CascadeType.ALL)
  private PrincipalEntity principal;
  @OneToOne(fetch = FetchType.EAGER)
  @Cascade(org.hibernate.annotations.CascadeType.ALL)
  private SessionEntity session;
  private Long timeTaken;

  public HttpExchangeEntity(HttpExchange httpExchange) {
    this.timestamp = httpExchange.getTimestamp();
    this.request = new RequestEntity(httpExchange.getRequest());
    this.response = new ResponseEntity(httpExchange.getResponse());
    this.principal = new PrincipalEntity(httpExchange.getPrincipal());
    this.session = new SessionEntity(httpExchange.getSession());
    if (httpExchange.getTimeTaken() != null) {
      this.timeTaken = httpExchange.getTimeTaken().toMillis();
    }
  }

  public static HttpExchange toHttpExchange(HttpExchangeEntity exchangeEntity) {
    HttpExchange httpExchange = new HttpExchange(exchangeEntity.timestamp,
        exchangeEntity.request.toRequest(exchangeEntity.request),
        exchangeEntity.response.toResponse(exchangeEntity.response),
        exchangeEntity.principal.toPrincipal(exchangeEntity.principal),
        exchangeEntity.session.toSession(exchangeEntity.session),
        Duration.of(exchangeEntity.timeTaken, ChronoUnit.MILLIS));
    return httpExchange;
  }
}

