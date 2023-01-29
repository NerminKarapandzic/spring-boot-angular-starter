package com.veet.core.actuator;

import com.veet.core.model.entity.httpexchange.HttpExchangeEntity;
import com.veet.core.model.repository.JpaHttpExchangeRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.actuate.web.exchanges.HttpExchange;
import org.springframework.boot.actuate.web.exchanges.HttpExchangeRepository;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomTraceRepository implements HttpExchangeRepository {

  private final JpaHttpExchangeRepository delegate;

  @Override
  public List<HttpExchange> findAll() {
    return null;
  }

  @Override
  public void add(HttpExchange httpExchange) {
    HttpExchangeEntity httpExchangeEntity = new HttpExchangeEntity(httpExchange);
    log.info("Persisting http trace: {}", httpExchangeEntity);
    delegate.save(httpExchangeEntity);
  }
}
