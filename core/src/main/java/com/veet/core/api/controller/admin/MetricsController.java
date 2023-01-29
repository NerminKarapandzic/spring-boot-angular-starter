package com.veet.core.api.controller.admin;

import com.veet.core.api.service.admin.MetricsService;
import com.veet.core.model.entity.httpexchange.HttpExchangeEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/_/metrics")
public class MetricsController {

  private final MetricsService metricsService;

  @PostMapping("/http-traces")
  public ResponseEntity<Page<HttpExchangeEntity>> getHttpTraces(@RequestBody PageRequest pageable) {
    return new ResponseEntity<>(metricsService.findAll(pageable), HttpStatus.OK);
  }
}
