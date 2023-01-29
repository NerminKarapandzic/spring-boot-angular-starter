package com.veet.core.model.repository;

import com.veet.core.model.entity.httpexchange.HttpExchangeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface JpaHttpExchangeRepository extends
    PagingAndSortingRepository<HttpExchangeEntity, Long>, JpaRepository<HttpExchangeEntity, Long> {

}
