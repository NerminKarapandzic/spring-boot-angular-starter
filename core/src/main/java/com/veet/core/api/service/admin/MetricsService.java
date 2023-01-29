package com.veet.core.api.service.admin;

import com.veet.core.model.entity.httpexchange.HttpExchangeEntity;
import com.veet.core.model.repository.JpaHttpExchangeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MetricsService {

  private final JpaHttpExchangeRepository httpExchangeRepository;

  public Page<HttpExchangeEntity> findAll(PageRequest pageable) {
    var result = httpExchangeRepository.findAll(pageable);
    return result;
  }
}
